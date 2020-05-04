import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrending } from '../_actions/user_action';
import LandingPage from '../components/views/LandingPage/LandingPage';
import {withRouter } from 'react-router-dom';

const TrendContainer = (props) => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTrending());
    
  }, []);
  
  const TrendData = useSelector(state => state.trending.movies, []) || [];
  console.log(TrendData)
  // 변경된 부분 you could use memoization to improve performance.
  
  return (
    <div>
      
      <p>Trend Movies</p>
      <div className="movieContainer"> // 변경된 부분
        { TrendData.results && TrendData.results.map(movie => (
          <LandingPage props={movie} key={movie.id}/>
        
        ))}
      </div>
    
    </div>
  )
}

export default withRouter(TrendContainer);
