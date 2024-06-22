import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashBoard from '../../components/DashBoard/DashBoard'
import { useSelector } from 'react-redux';
import { Router, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const DashBoardProfile = () => {

  /**
   * router
   */
  const params = useParams();

  /**
   * states
   */
  const[pageDashboard, setPageDashboard] = useState({}); 
  const[loading, setLoading] = useState(false);

  /**
   * states Redux
   */
  const userP = useSelector(state => state.posts.user);
  const theme = useSelector(state => state.posts.themeW);
  const link = useSelector(state => state.posts.linkBaseBackend);

  /**
   * useEffect
   */
  useEffect(() => {
    setLoading(true);
    fetch(`${link}/pages/page-dashboard/${params.id}`)
      .then((response) => response.json())
      .then((pageDashboard) => {   
        console.log(pageDashboard);
        setPageDashboard(pageDashboard.userInfo);
    })  
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, [params.id]);

  return (
    <div>
        {
          loading ? <Spinner/> : (
            <>
              <Sidebar />
              <h1 className={`${theme ? 'text-black' : 'text-white'} text-center mt-10`}>Dashboard</h1>
              <div className=' mt-2'>
                  <DashBoard counts={pageDashboard}/>
              </div>
            </>
          )
        }

        
    </div>
  )
}

export default DashBoardProfile