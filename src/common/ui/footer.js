import React from 'react';
import {} from 'react-bootstrap'



class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
            © 2021 Copyright:
            </div>

            </footer>
        );
    }
}

export default Footer;