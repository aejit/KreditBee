import { Card, CardContent, withStyles } from '@material-ui/core';
import React, { useEffect } from "react";
import LazyLoad from 'react-lazyload';
import { getAlbums, getAlbumsById } from "../api/api";
import Carousel from 'react-elastic-carousel';

const styles = theme => ({
    card: {
        width: 275,
        height: 'auto',
        marginTop: 20,
        flexBasis: "48%",
    },
});

function truncate(input) {
    if (input.length > 5) {
        return input.substring(0, 15) + '...';
    }
    return input;
};

export const Homepage = (props) => {

    const { classes } = props;


    let AlbumID = 1;

    const [state, setState] = React.useState({
        data: [],
    });

    const [albumData, setalbumData] = React.useState({
        Albumdata: [],
    });

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 40, itemsToShow: 2, itemsToScroll: 2 },
        { width: 66, itemsToShow: 3 },
        { width: 100, itemsToShow: 5 }
    ];

    useEffect(() => {
        getAlbums().then(function (data) {
            setState({ data: data });
        });
    }, []);

    // console.log(state.data, "Data");

    useEffect(() => {
        getAlbumsById(AlbumID).then(function (data) {
            setalbumData({ Albumdata: data });
        });
    }, [AlbumID]);

    // console.log(albumData.Albumdata);

    return (
        albumData && state.data.map((data) =>
            <LazyLoad>
                <Card style={{
                    margin: '10px',
                    padding: '5px'

                }}>
                    <p style={{ marginLeft: '15px' }}><h2>{data.title}</h2></p>
                    <span style={{ marginLeft: '15px' }}> id: {data.id}</span> <span>userid: {data.userId}</span>
                    <hr></hr>
                    <CardContent>
                        <div >
                            {
                                <LazyLoad 
                                >
                                    <Carousel breakPoints={breakPoints} >
                                        {
                                            albumData.Albumdata.map((data) =>
                                                <div style={{
                                                    width: '150px',
                                                    height: '250px',
                                                    margin: '3px',
                                                    outline: "none",

                                                }}>
                                                    <img src={`${data.url}`} style={{ width: '150px' }} />
                                                    <p>
                                                        <span style={{
                                                            maxWidth: 80,
                                                            overflow: 'hidden',
                                                            padding: '3px',
                                                            textOverflow: 'ellipsis'
                                                        }}>

                                                            {truncate(data.title)}

                                                        </span>

                                                        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 'bold' }}>id: {data.id}</p>
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </Carousel>
                                </LazyLoad>
                            }

                        </div>
                    </CardContent>
                </Card>
            </LazyLoad >
        )
    )

}
export default withStyles(styles)(Homepage)