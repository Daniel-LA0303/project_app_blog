import React, { useEffect, useState } from 'react'

//components
import Sidebar from '../../components/Sidebar/Sidebar';
import Post from '../../components/Post/Post';
import LoadingPosts from '../../components/Spinner/LoadingPosts';

import { useSelector } from 'react-redux';
import Aside from '../../components/Aside/Aside';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import Slider from '../../components/Slider/Slider'
import AsideMenu from '../../components/Aside/AsideMenu';


const Home = () => {

  /**
   * States
   */
  const[cats, setCats] = useState([]);
  const[posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(false);

  /**
   * States Redux
   */
  const user = useSelector(state => state.posts.user);
  const theme = useSelector(state => state.posts.themeW);
  const link = useSelector(state => state.posts.linkBaseBackend);

  /**
   * useEffect
   */
  useEffect(() => {
    setLoading(true);
    fetch(`${link}/pages/page-home`)
    .then((response) => response.json())
    .then((pageHome) => {
      setCats(pageHome.categories);
      setPosts(pageHome.posts);   
    })   
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

    
  return (
    <div className='  '>
        <Sidebar />
        {loading ?  <LoadingPosts/> : 
        <>
          <div className=' block z-10 md:hidden md:visible w-full'>
            <Slider className=" " cats={cats}/>
          </div>
          <div className='flex flex-row justify-center mt-0 md:mt-10 mx-auto w-full md:w-11/12  lg:w-11/12'>
            <aside className='hidden md:block w-0 md:w-3/12  lg:w-2/12 mt-5'>
              <AsideMenu 
                user={user}
              />
            </aside>
            <div className=' w-full  sm:mx-0   lg:w-7/12 flex flex-col items-center'>
                {posts.length == 0 ? (
                  <p className={`${theme ? 'text-black' : 'text-white'} text-center mx-auto my-10 text-3xl`}>There is nothing around here yet</p>
                ): (
                  <>
                    {[...posts].reverse().map(post => (
                      <Post 
                          key={post._id}
                          post={post}
                      />
                    ))}  
                  </>
                )} 
            </div>
            <aside className=' hidden lg:block w-0 md:w-3/12  lg:w-2/12'>
              {cats.map(cat => (
                <Aside 
                  cats={cat}
                />
              ))}

            </aside>
            <ScrollButton />
          </div>
        </>}
    </div>
  )
}

export default Home