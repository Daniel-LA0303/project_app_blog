import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar'
import NewCardCategory from '../../components/CategoryCard/NewCardCategory';;
import LoadingCategory from '../../components/Spinner/LoadingCategory';

const Categories = () => {

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
      fetch(`${link}/pages/page-categories/`)
      .then((response) => response.json())
      .then((cats) => {   
        setCategories(cats.categories);
        console.log(cats.categories);
      })  
      setTimeout(() => {
          setLoading(false);
      }, 500);
    }, []);

  return (
    <div className='mb-10'>
        <Sidebar />
        <p className={`${theme ? ' text-black' : 'text-white'} text-center mt-10 text-3xl`}>All Categories</p>
        <div className=' grid gap-2 md:grid-cols-4 w-full md:w-11/12 lg:w-11/12 mx-auto mb-10'>
          <>
            {loading ? (
              <LoadingCategory />
            ):(
              <>
                {categories.map(cat => (
                  <NewCardCategory 
                    key={cat._id}
                    category={cat}
                    userP={userP}
                  />
                ))}
              </>
            )}
          </>

        </div>

    </div>
  )
}

export default Categories