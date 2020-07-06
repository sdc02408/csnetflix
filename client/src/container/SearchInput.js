import React, { useState, useEffect } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../components/Config'
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons'
import '../static/sass/components/Search.scss'
import { Col, Input, Row } from 'antd'
import { useHistory } from 'react-router-dom'
import SearchPage from '../components/views/SearchPage/SearchPage'

const SearchInput = () => {
  
  let history = useHistory()
  
  const [search, setSearch] = useState('')
  const [lists, setLists] = useState(false)
  const [movieLists, setMovieLists] = useState([])

  
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=kr&page=1&query=${search}`
  
  const fetch = async () => {
    const response = await axios.get(url)
    setMovieLists(response.data.results)
  }


  const onChange = (e) => {
    setSearch(e.target.value)
    fetch(setMovieLists)
    return history.push('/searchpage')
  }
  
  const clickSearch = () => {
    setLists(!lists)
  }

  
  return (
    <div className={"searchEle"} style={{ padding: '7px 1px'}} >
      
      <div className="inputEle" >
        {lists &&
        <Input className="searchText" type="text" value={search} onChange={onChange} placeholder="제목을 입력하세요"/>
        }
        <a className="searchIcon" style={{ color: '#ffffff' }} onClick={clickSearch}><SearchOutlined style={{fontSize:'18px'}}/></a>
        
      </div>
      
      <div className={'searchMovie' + (lists ? "show" : "")} style={{ width: '100%', position: 'fixed', top: '100px', left: '0%', }} >
        <Row gutter={[24, 24]} style={{ width: '95%', margin: '0 auto', position: 'relative' }}>
          
          {movieLists && movieLists.map(movie => (
            <Col span={3}>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} style={{ width: '100%' }}/>
            </Col>
          ))}
          
        </Row>
      </div>
      
      
    </div>
  )
}

export default SearchInput
