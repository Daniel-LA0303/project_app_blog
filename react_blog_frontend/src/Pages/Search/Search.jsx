import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import SearchCom from '../../components/SearchCom/SearchCom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesAction } from '../../StateRedux/actions/postAction'
import Spinner from '../../components/Spinner/Spinner'
const Search = () => {

  /**
   * route
   */
  const params = useParams();

  /**
   * states
   */
  const[catFilter,setCatFilter] = useState([]);
  const[postFilter, setPostFilter] = useState([]);
  const[usersFilter, setUsersFilter] = useState([]);
  const[loading, setLoading] = useState(false);

  /**
   * states Redux
   */
  const link = useSelector(state => state.posts.linkBaseBackend);
  
  /**
   * useEffect
   */
  useEffect(() => {
      setLoading(true);
      fetch(`${link}/posts/search-by-param/${params.id}`)
      .then((response) => response.json())
      .then((res) => {
        setCatFilter(res.categories);
        setPostFilter(res.posts);
        setUsersFilter(res.users);
      })

      setTimeout(() => {
          setLoading(false);
      }, 500);
  }, [params.id]);
  return (
    <div>
      {
        loading ? <Spinner/> :
        <>
          <Sidebar />
          <SearchCom 
            cats={catFilter}
            posts={postFilter}
            users={usersFilter}
          />
        </>
      }
    </div>
  )
}

export default Search