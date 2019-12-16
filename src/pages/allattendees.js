/* eslint-disable linebreak-style */
import React from 'react';
import Axios from 'axios';
// @material-ui/core ../components
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Button from '../components/CustomButtons/Button';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';

import styles from '../assets/jss/material-kit-react/views/loginPage';

import image from '../assets/img/bg7.jpg';
const useStyles = makeStyles(styles);


export default function AllAttendees (props) {
    const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
    setTimeout(() => {
      setCardAnimation('');
    }, 700);
    const classes = useStyles();

    const [data, setData] = React.useState({ attendees: [], loading: true });
    React.useEffect(() => {
    const fetchData = async () => {
    const result = await Axios(
      'https://conf-mylaw.herokuapp.com/api/attendees',
    );
    setData(result.data);
    };
    fetchData();
    }, []);

    const onDelete = (id) => {

        fetch('https://conf-mylaw.herokuapp.com/api/attendee/delete/' + id, {
            method: 'POST',
          })
          alert('Invitation revoked, this page will reload now')
          props.history.push('/')
          setTimeout(() => props.history.push('/attendeelist') , 2000);
    }
    

    if (data.loading) {
        return <p>fetching attendee information...</p>
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
            <CardHeader color="primary" className={classes.cardHeader}>
                <h4>List of Attendees</h4>
            </CardHeader>
        <ul>
        {data.attendees.map(attendee => <li key={attendee._id}>
             <h4>{attendee.name}</h4>
             <p> {attendee.email} </p>
             <p>{attendee.category}</p>
             <Button onClick={ () => {onDelete(attendee._id)} } simple color="primary" size="lg">
                Revoke this invitation
            </Button>
          </li>)}
      </ul>
      </Card>
        </GridItem>
        </GridContainer>
        </div>
      </div>
    </div>
    );
}
