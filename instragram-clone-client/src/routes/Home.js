import React from 'react';
import { compose, graphql } from 'react-apollo';
import gpl from 'graphql-tag';
import Toolbar  from '../components/toolbar';

const query = gpl`{
  getAllUser{
    username
  }
}
`;

const userItem = (user,i) => <li key={i}>{user.username}</li>

export default graphql(query)(
  ({data: {getAllUser = [], loading}}) => {
    return([
      <Toolbar/>,
      <ul>
        {getAllUser.map(userItem)}
      </ul>
    ]
    )
    
  }
)