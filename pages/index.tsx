import Head from 'next/head'
import React from 'react'
import { PostListItem } from '../components/PostListItem';
import { HomeSidebar } from '../components/HomeSidebar';

const Home: React.FC = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem/>
        </div>
        <div className="col-lg-4">
          <HomeSidebar/>
        </div>
      </div>
    </div>
  )
}

export default Home;