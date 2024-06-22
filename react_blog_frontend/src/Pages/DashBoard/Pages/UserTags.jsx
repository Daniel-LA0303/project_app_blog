import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import LoadingCategory from '../../../components/Spinner/LoadingCategory'
import { useParams } from 'react-router-dom'
import NewCardCategory from '../../../components/CategoryCard/NewCardCategory'
import { useSelector } from 'react-redux'

const UserTags = () => {

  /**
   * route
   */
  const params = useParams();

  /**
   * states
   */
  const[categories, setCategories] = useState([]);
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
    fetch(`${link}/pages/page-dashboard-tag-user/${params.id}`)
      .then((response) => response.json())
      .then((pageCats) => {
        setCategories(pageCats.categories);
    }) 
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, [params.id]);

  
  return (
    <div className={`${theme ? 'text-black' : 'text-white'}`}>
      <Sidebar />
      <h2 className=' text-center my-5 text-2xl'>Tags you follow</h2>
      <div className='w-full md:w-10/12 lg:w-8/12 mx-auto mb-10'>
        <div className='  '>
          {loading ? (
            <LoadingCategory />
          ) : (
            <>
              {categories.length == 0 ? (
                  <p className={`${theme ? 'text-black' : 'text-white'} text-center m-auto my-10 text-3xl`}>There is nothing around here yet</p>
              ) : (
                <div className='grid gap-2 md:grid-cols-2 w-full'>
                {categories.map(cat => (
                    <NewCardCategory 
                      key={cat._id}
                      category={cat}
                      userP={userP}
                    />
                  ))}
                </div>
              )} 
            </>
          )}


        </div>
      </div>
      
    </div>
  )
}

export default UserTags