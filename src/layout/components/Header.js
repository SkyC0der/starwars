import { Navbar, Container } from 'react-bootstrap';
import logo from './../../logo.svg';

export default function header() {
    return (
        <>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="Star wars logo"/>
                        
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br />
        </>
    )
}
