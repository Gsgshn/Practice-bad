import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardProfile(props) {

  return (
    <div className="card-profile">
      <div className="card" style={{ background: '#FFFAFA', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Login: {props.login}</p>
          <p className="card-text">Email: {props.email}</p>
          <p className="card-text">Roles: {props.roles}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
