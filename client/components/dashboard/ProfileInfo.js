import React from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'react-materialize';


const ProfileInfo = (props) => {
  const imgFallback = '/client/static/profile_image.png';
  return (
    <Col s={12} m={3} className="center">
      <Col s={12} className="profile-info">
        <div>
          <img className="circle profile-img responsive-img"
            src={props.image || imgFallback}
            alt="profile image"
          />
          <h6>{props.name || 'Your Name Here'}</h6>
        </div>
      </Col>
      <Col s={12} className="profile-info">
        <a className="btn waves-effect"
          href="#"
          onClick={props.onClick}
        >
          <Icon>edit</Icon>
          Edit Profile
        </a>
      </Col>
    </Col>
  );
};

ProfileInfo.propTypes = {
  name: PropTypes.string,
  image: PropTypes.array,
  onClick: PropTypes.func,
};

export default ProfileInfo;
