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


export default function AllTalks (props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(() => {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();

  const [data, setData] = React.useState({ talks: [], loading: true });
    React.useEffect(() => {
    const fetchData = async () => {
    const result = await Axios(
      '/api/talks',
    );
    setData(result.data);
    };
    fetchData();
    }, []);

    const onDelete = (id) => {

        fetch('/api/talk/delete/' + id, {
            method: 'POST',
          })
          alert('Deleted, this page will reload now')
          props.history.push('/')
          setTimeout(() => props.history.push('/talklist') , 2000);
    }
    

    if (data.loading) {
        return <p>fetching talk information...</p>
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
              <h4>All The Talk Session</h4>
            </CardHeader>
      <ul>
        {data.talks.map(talk => <li key={talk._id}>
             <h4>{talk.talk_title}</h4>
             <p> {talk.talk_time} </p>
             <p>{talk.talk_synopsis}</p>
             <Button onClick={ () => {onDelete(talk._id)} } simple color="primary" size="lg">
                Remove this talk
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
