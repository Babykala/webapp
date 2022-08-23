import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';


function Web() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("all");
    const [page, setPage] = useState(1);
    const client_id = "ds3GnXfcKhHUnDFXULHztevE0Qw29KhcKK4FzDVBDO8";
    const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

    const fetchImages = () => {
        axios
            .get(fetchUrl)
            .then((response) => {
                setData([...data, ...response.data.results]);
            })
            .catch((error) => {
                console.log(error);
            });
        setPage(page + 1);
    }
    useEffect(() => {
        fetchImages();
    }, [query]);

    const handleChange = (e) => {
        console.log(e.target.value)
        setQuery(e.target.value);
        setData([]);

    };

    return (
        <div className="header">
            <div className="body">
                <div className="container">
                    <div>
                        <h1>
                             INFINITE SCROLL IMAGE GALLERY FROM UNSPLASH
                        </h1>
                        <div className='navbar'>
                            <input value='All' type="button" onClick={handleChange} className='link' />
                            <input value='Web Design' type="button" onClick={handleChange} className='link' />
                            <input value='Natural Design' type="button" onClick={handleChange} className='link' />
                            <input value='3D Rendering' type="button" onClick={handleChange} className='link' />
                        </div>

                    </div>

                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchImages}
                        hasMore={true}
                        loader={<p>Load more...</p>}
                    >
                        <div className="image-grid" style={{ marginTop: "30px" }}>
                            {data.map((image, index) => (
                                    <div className="image-item" key={index} >
                                        <img src={image.urls.regular} alt={data.alt_description} />
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>

    );
}

export default Web;
