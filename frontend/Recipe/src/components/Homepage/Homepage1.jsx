import React from 'react';
import { Nav, Navbar, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage1() {
    const navigate = useNavigate();
    const handleButton = (e) => {
        e.preventDefault();
        navigate('/Login');
    };

    return (
        <>
            <div>
                {/* Navbar */}
                <Navbar expand="lg" style={{ backgroundColor: "#ff9f1c" }}>
                    <Container fluid>
                        <Navbar.Brand className="heading">RecipeBook</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                                <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                                <Nav.Link as={Link} to="/ShareRecipe">Share Recipe</Nav.Link>
                                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {/* Hero Section */}
                <div className="image-container">
                    <div
                        className="hero-section text-center"
                        style={{
                            backgroundImage: 'url(/Recipe-sharing.png)',
                            padding: '50px 20px',
                            marginLeft:'15px',
                            color: 'white',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition:  '50% 10%',
                            height: '80vh',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h3>Discover and share Delicious Recipes</h3>
                        <p>Your ultimate recipe sharing platform.</p>
                        <Button
                            className="mt-3"
                            onClick={handleButton}
                            variant="warning"
                            size="lg"
                        >
                            Explore Recipes
                        </Button>
                    </div>
                </div>

                {/* Explore by Category */}
                <Container className="mt-5 ms-3">
                    <h2 className="text-center mb-4">Explore by category</h2>
                    <Row className="g-4">
                        <Col xs={12} md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src="/dessert-image.jpg"
                                    alt="Dessert"
                                    className="img-fluid"
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Dessert</Card.Title>
                                    <Button as={Link} to="/categories/Dessert" variant="warning" className="mt-auto">
                                        Explore
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                            <Card className="h-100 ms-2">
                                <Card.Img
                                    variant="top"
                                    src="/appetizers-image.jpg"
                                    alt="Appetizers"
                                    className="img-fluid"
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Appetizers</Card.Title>
                                    <Button as={Link} to="/categories/appetizers" variant="warning" className="mt-auto">
                                        Explore
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* Featured Recipes */}
                <Container className="mt-5 ms-3">
                    <h2 className="text-center mb-4">Featured Recipes</h2>
                    <Row className="g-4">
                        <Col xs={12} md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src="/paneer-pizza.jpg"
                                    alt="Paneer Pizza"
                                    className="img-fluid"
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Paneer Pizza</Card.Title>
                                    <Button as={Link} to="/categories/appetizers" variant="warning" className="mt-auto">
                                        Explore
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* Footer */}
                <footer className="bg-light text-center text-lg-start mt-5">
                    <Container className="p-4">
                        <p>&copy; 2024 RecipeBook. All rights reserved.</p>
                        <div>
                            <span>
                                <Link to="/privacy-policy" className="text-muted mx-2">Privacy Policy</Link>
                            </span>
                            <span>
                                <Link to="/terms-of-service" className="text-muted mx-2">Terms of Service</Link>
                            </span>
                        </div>
                    </Container>
                </footer>
            </div>
        </>
    );
}

export default Homepage1;
