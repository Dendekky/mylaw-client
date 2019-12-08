/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
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

export default function AssignedTalkForm () {
    const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
    setTimeout(() => {
      setCardAnimation('');
    }, 700);
    const classes = useStyles();

    const [request, setRequest] = useState({ talk: '', attendee: '' });
    const [serverError, setServerError] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);

    const data = { 
        talk: request.talk,
        attendee: request.attendee,
    };

    const onChange = (e) => {
        e.persist();
        setRequest({...request, [e.target.name]: e.target.value});
    } 
    const onSubmit = async (event) => {
        event.preventDefault();
        
        console.log(data)

        try {
        const res = await Axios.post(`https://mylaw-talks.herokuapp.com/api/talk/assign`, data)
            if (res.data.status === 201) {
            setSubmit(true)
            } else if (res.data.status === 406) {
                setServerError(res.data.errors)
            }
        }
        catch(error) {
            setError(true);
        }
    }

    const [talkData, setTalks] = useState({ talks: [], loading: true });
    const [attendeeData, setAttendees] = useState({ attendees: [], loading: true });
    React.useEffect(() => {
    const fetchData = async () => {
      const talkResult = await Axios(
        '/https://mylaw-talks.herokuapp.com/api/talks',
      );
      setTalks(talkResult.data);
      const attendeeResult = await Axios(
        '/https://mylaw-talks.herokuapp.com/api/attendees',
      );
      setAttendees(attendeeResult.data);
    };
    fetchData();
    }, []);

    const attendee = attendeeData.attendees.map(attendee => attendee.name);
    const talk = talkData.talks.map(list => list.talk_title);

    if (talkData.loading && attendeeData.loading) {
        return <p>loading information...</p>
      }

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
                <h4>Assign a talk to a speaker</h4>
                </CardHeader>
                <CardBody>
                <Select 
                name='attendee' 
                value= {request.attendee} 
                onChange= {onChange} 
                displayEmpty className={classes.selectEmpty}>
                    <MenuItem value="" disabled>
                        List of Attendees
                    </MenuItem>
                    <MenuItem value={attendee[0]}>{attendee[0]}</MenuItem>
                    <MenuItem value={attendee[1]}>{attendee[1]}</MenuItem>
                    <MenuItem value={attendee[2]}>{attendee[2]}</MenuItem>
                    <MenuItem value={attendee[3]}>{attendee[3]}</MenuItem>
                    <MenuItem value={attendee[4]}>{attendee[4]}</MenuItem>
                    <MenuItem value={attendee[5]}>{attendee[5]}</MenuItem>
                    <MenuItem value={attendee[6]}>{attendee[6]}</MenuItem>
                    <MenuItem value={attendee[7]}>{attendee[7]}</MenuItem>
                    <MenuItem value={attendee[8]}>{attendee[8]}</MenuItem>
                    <MenuItem value={attendee[9]}>{attendee[9]}</MenuItem>
                </Select>
                    <FormHelperText>Speakers</FormHelperText>  
                    <Select 
                name='talk' 
                value= {request.talk} 
                onChange= {onChange} 
                displayEmpty className={classes.selectEmpty}>
                    <MenuItem value="" disabled>
                        List of Talks
                    </MenuItem>
                    <MenuItem value={talk[0]}>{talk[0]}</MenuItem>
                    <MenuItem value={talk[1]}>{talk[1]}</MenuItem>
                    <MenuItem value={talk[2]}>{talk[2]}</MenuItem>
                    <MenuItem value={talk[3]}>{talk[3]}</MenuItem>
                    <MenuItem value={talk[4]}>{talk[4]}</MenuItem>
                    <MenuItem value={talk[5]}>{talk[5]}</MenuItem>
                    <MenuItem value={talk[6]}>{talk[6]}</MenuItem>
                    <MenuItem value={talk[7]}>{talk[7]}</MenuItem>
                    <MenuItem value={talk[8]}>{talk[8]}</MenuItem>
                    <MenuItem value={talk[9]}>{talk[9]}</MenuItem>
                </Select>
                    <FormHelperText>Available Talks</FormHelperText>    
                </CardBody>
                {
                    submit && <div style={{textAlign: `center`, color: `green`}}>
                        You have now assigned the talk {data.talk} to speaker {data.attendee}. 
                        </div>
                } 
                {
                    serverError.map(error => <div key={error.value} style={ {textAlign: `center`, color: `red`} }>
                    <p>{error.msg}</p>
                    </div>)
                }
                {
                    error && <div style={ {textAlign: `center`, color: `red`} }>error submitting this information</div>
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
