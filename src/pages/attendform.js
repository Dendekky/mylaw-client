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
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
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

export default function AttendeeForm(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(() => {
    setCardAnimation('');
  }, 700);

  const [request, setRequest] = useState({ name: '', email: '', category: '' });
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
      name: request.name,
      email: request.email,
      category: request.category
    };

    Axios.post(`https://conf-mylaw.herokuapp.com/api/attendee/add`, data)
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
                    <h4>Register for the conference</h4>
                  </CardHeader>
                  <CardBody>
                  <CustomInput
                      labelText="Your Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        name: 'name',
                        value: request.name,
                        onChange: onChange,
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Your email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'email',
                        name: 'email',
                        value: request.email,
                        onChange: onChange,
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Select 
                    name='category' 
                    value= {request.category} 
                    onChange= {onChange} 
                    displayEmpty className={classes.selectEmpty}>
                        <MenuItem value="" disabled>
                            Your role at the conference
                        </MenuItem>
                        <MenuItem value={'Speaker'}>Speaker </MenuItem>
                        <MenuItem value={'Audience'}>Audience</MenuItem>
                        <MenuItem value={'Organizer'}>Organizer</MenuItem>
                    </Select>
                        <FormHelperText>Category</FormHelperText>     
                  </CardBody>
                    {
                      submit && <div style={{textAlign: `center`, color: `green`}}>Thanks for attending the confence. You can now check the list to confirm your name</div>
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
