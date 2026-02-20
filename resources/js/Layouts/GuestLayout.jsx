import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Shield, Lock } from "react-bootstrap-icons";

export default function GuestLayout({ children }) {
    const { component } = usePage();
    
    // Check if current component is Register
    const isRegisterPage = component === 'Auth/Register';
    
    // You can also add other pages that need larger columns
    const getColumnSize = () => {
        if (isRegisterPage) return 8;
        // Add more conditions here if needed
        // if (component === 'Auth/SomeOtherPage') return 7;
        return 5; // default size for login and other auth pages
    };
    
    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
            <Col md={getColumnSize()}>
                {/* Optional: Show different logo/title for register page */}
                {isRegisterPage && (
                    <div className="text-center mb-4">
                        <h5 className="text-secondary fw-normal">
                            Partner Organization Registration
                        </h5>
                    </div>
                )}
                
                {/* Card */}
                <Card className="border-0 shadow-lg rounded-4">
                    <Card.Body className="p-5">{children}</Card.Body>
                </Card>

                {/* Footer */}
                <p className="text-center text-secondary small mt-4">
                    © {new Date().getFullYear()} Kitui County Government. All
                    rights reserved.
                </p>
            </Col>
        </Container>
    );
}