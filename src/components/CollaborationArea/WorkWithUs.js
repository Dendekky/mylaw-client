/* eslint-disable linebreak-style */
import React from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import CustomInput from '../CustomInput/CustomInput';
import Button from '../CustomButtons/Button';
import workStyles from '../../assets/jss/material-kit-react/views/landingPageSections/workStyle';


const useWorkStyles = makeStyles(workStyles);

export default function WorkWithUs(props) {
  const workClasses = useWorkStyles();
  const [request, setRequest] = React.useState({ name: '', email: '', message: '' });
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onChange = (e) => {
    e.persist();
    setRequest({...request, [e.target.name]: e.target.value});
  } 

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      name: request.name,
      email: request.email,
      message: request.message
    };

    Axios.post(`https://handyman-api.herokuapp.com/handyman/collaborate`, data)
      .then((res) => {
        if (res.status === 200) {
        //   alert('your application hs been submitted')
          setSuccess(true)
        }
      })
      .catch((error) => {
        setError(true);
      })
  };


  const { ...rest } = props;
  return (
    <div>

    <div className={workClasses.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={workClasses.title}>Work with us</h2>
          <h4 className={workClasses.description}>
            Want to get on board or collaborate with us? Fill this form and hit the send button. We promise to  get back to you in a couple of
            hours.
          </h4>
          <form onSubmit={onSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  inputProps={{
                    type: 'text',
                    name: 'name',
                    value: request.name,
                    onChange: onChange,
                    required: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  inputProps={{
                    type: 'email',
                    name: 'email',
                    value: request.email,
                    onChange: onChange,
                    required: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: workClasses.textArea,
                }}
                inputProps={{
                    type: 'text',
                    name: 'message',
                    value: request.message,
                    onChange: onChange,
                    required: true,
                    multiline: true,
                    rows: 5,
                }}
              />
              <div>
                {
                    success && <div style={{color: `green`}}>Your request has been submitted successfully</div>
                }
                {
                    error && <div style={{color: `red`}}>error submitting this information</div>
                }
                </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={workClasses.textCenter}>
                  <Button type="submit" color="primary">Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
</div>
  );
}
