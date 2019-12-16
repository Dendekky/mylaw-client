import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// @material-ui/core ../components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import TitleIcon from '@material-ui/icons/Title';
import ShortTextIcon from '@material-ui/icons/ShortText';
// core ../components
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Button from '../components/CustomButtons/Button';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardHeader from '../components/Card/CardHeader';
import CardFooter from '../components/Card/CardFooter';
import CustomInput from '../components/CustomInput/CustomInput';

import styles from '../assets/jss/material-kit-react/views/loginPage';

import image from '../assets/img/bg7.jpg';

const useStyles = makeStyles(styles);

export default function TalkForm(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(() => {
    setCardAnimation('');
  }, 700);

  const [request, setRequest] = useState({ talk_title: '', talk_time: '', talk_synopsis: '' });
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [serverError, setServerError] = useState([]);

  const onChange = (e) => {
    e.persist();
    setRequest({...request, [e.target.name]: e.target.value});
  } 

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      talk_title: request.talk_title,
      talk_time: request.talk_time,
      talk_synopsis: request.talk_synopsis
    };
    console.log(data)

    Axios.post(`https://conf-mylaw.herokuapp.com/api/talk/add`, data)
      .then((res) => {
        if (res.data.status === 201) {
          setSubmit(true)
        } else if(res.data.status === 406) {
            setServerError(res.data.errors)
        }
      })
      .catch((error) => {
        setError(true);
      })
  };

  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Submit a talk for the conference</h4>
                  </CardHeader>
                  <CardBody>
                  <CustomInput
                      labelText="The Topic of the Talk"
                      id="title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        name: 'talk_title',
                        value: request.talk_title,
                        onChange: onChange,
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <TitleIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Talk Synopsis"
                      id="synopsis"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        name: 'talk_synopsis',
                        value: request.talk_synopsis,
                        onChange: onChange,
                        required: true,
                        multiline: true,
                        rows: 5,
                        endAdornment: (
                          <InputAdornment position="end">
                            <ShortTextIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Select 
                    name='talk_time' 
                    value= {request.talk_time} 
                    onChange= {onChange} 
                    displayEmpty className={classes.selectEmpty}>
                        <MenuItem value="" disabled>
                            Appropriated Talk Time
                        </MenuItem>
                        <MenuItem value={'Fifteen minutes'}>Fifteen minutes </MenuItem>
                        <MenuItem value={'Thirty Minutes'}>Thirty Minutes</MenuItem>
                        <MenuItem value={'An hour'}>An hour</MenuItem>
                    </Select>
                        <FormHelperText>Talk Time</FormHelperText>      
                  </CardBody>
                    {
                      submit && <div style={{textAlign: `center`, color: `green`}}>Thanks for submitting a talk. You can now check the talk list to confirm your talk</div>
                    } 
                    {
                      error && <div style={ {textAlign: `center`, color: `red`} }>error submitting this information</div>
                    } 
                    {
                      serverError.map(error => <div key={error.value} style={ {textAlign: `center`, color: `red`} }>
                        <p>{error.msg}</p>
                        </div>)
                    }
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Submit
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
