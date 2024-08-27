import React from "react";

class GusApi extends React.Component {
    state = {
        nip: '7750001125',
    }

    componentDidMount() {
        // const apiWork = () => this.setState({});
        console.log('zamontowano');
        const url = 'https://dane.biznes.gov.pl/api/ceidg/v2/firma?nip=5261003187';
        const apiKey = 'eyJraWQiOiJjZWlkZyIsImFsZyI6IkhTNTEyIn0.eyJnaXZlbl9uYW1lIjoiR3J6ZWdvcnoiLCJwZXNlbCI6Ijc5MDEyODE5ODk4IiwiaWF0IjoxNzA1MzQ1NTU0LCJmYW1pbHlfbmFtZSI6IkR5Y2hhxYJhIiwiY2xpZW50X2lkIjoiVVNFUi03OTAxMjgxOTg5OC1HUlpFR09SWi1EWUNIQcWBQSJ9.pxOo9dhbxE5nbbntTi24bpatcgKeAFgoDlHhlwl6Jk4WXnpYtuVpFl9rzVQ-1e_MR37ZjSzY7OfGKjgcARa5-g';

        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers:
            {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(json => console.log(JSON.stringify(json)));


    }

    render() {

        return (
            <div>
                działa
            </div>
        )
    }
}

export default GusApi;