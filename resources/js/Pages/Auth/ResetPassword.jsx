import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import {
    Envelope,
    Lock,
    Shield,
    Eye,
    EyeSlash,
    CheckCircle,
} from "react-bootstrap-icons";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = data.password;
        if (!password)
            return { strength: 0, text: "No password", variant: "secondary" };
        if (password.length < 6)
            return { strength: 25, text: "Too short", variant: "danger" };
        if (password.length < 8)
            return { strength: 50, text: "Weak", variant: "warning" };
        if (
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        ) {
            return { strength: 100, text: "Strong", variant: "success" };
        }
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { strength: 75, text: "Good", variant: "info" };
        }
        return { strength: 50, text: "Fair", variant: "warning" };
    };

    const strength = getPasswordStrength();

    return (
        <GuestLayout>
            <Head title="Reset Password - GBV Portal" />

            {/* Header */}
            <div className="text-center mb-4">
                <h4 className="fw-bold mb-2">Create New Password</h4>
                <p className="text-secondary small">
                    Kitui County GBV Information System
                </p>
            </div>

            {/* Info Message */}
            <Alert
                variant="info"
                className="mb-4 small d-flex align-items-center gap-2 bg-info bg-opacity-10 border-info border-opacity-25"
            >
                <Shield className="text-info flex-shrink-0" size={16} />
                <span>
                    <strong>Password Requirements:</strong> Minimum 8 characters
                    with at least one uppercase letter, one number, and one
                    special character.
                </span>
            </Alert>

            <Form onSubmit={submit}>
                {/* Email Field (read-only) */}
                <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-secondary">
                        <Envelope className="me-1" size={12} />
                        Email Address
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                            <Envelope size={16} className="text-secondary" />
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="border-start-0 bg-light"
                            placeholder="gv.officer@kitui.go.ke"
                            autoComplete="username"
                            readOnly={!!email}
                            isInvalid={!!errors.email}
                        />
                    </InputGroup>
                    {errors.email && (
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block small mt-1"
                        >
                            {errors.email}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {/* New Password Field */}
                <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-secondary">
                        <Lock className="me-1" size={12} />
                        New Password
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                            <Lock size={16} className="text-secondary" />
                        </InputGroup.Text>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="border-start-0 bg-light"
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            isFocused={true}
                            isInvalid={!!errors.password}
                        />
                        <Button
                            variant="link"
                            className="bg-light border text-secondary text-decoration-none"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 5 }}
                        >
                            {showPassword ? (
                                <EyeSlash size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </Button>
                    </InputGroup>

                    {/* Password Strength Indicator */}
                    {data.password && (
                        <div className="mt-2">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="small text-secondary">
                                    Password strength:
                                </span>
                                <span
                                    className={`small text-${strength.variant} fw-semibold`}
                                >
                                    {strength.text}
                                </span>
                            </div>
                            <div className="progress" style={{ height: "4px" }}>
                                <div
                                    className={`progress-bar bg-${strength.variant}`}
                                    style={{ width: `${strength.strength}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {errors.password && (
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block small mt-1"
                        >
                            {errors.password}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-secondary">
                        <CheckCircle className="me-1" size={12} />
                        Confirm New Password
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0">
                            <Lock size={16} className="text-secondary" />
                        </InputGroup.Text>
                        <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="border-start-0 bg-light"
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                            isInvalid={!!errors.password_confirmation}
                        />
                        <Button
                            variant="link"
                            className="bg-light border text-secondary text-decoration-none"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{ zIndex: 5 }}
                        >
                            {showConfirmPassword ? (
                                <EyeSlash size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </Button>
                    </InputGroup>
                    {errors.password_confirmation && (
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block small mt-1"
                        >
                            {errors.password_confirmation}
                        </Form.Control.Feedback>
                    )}

                    {/* Password Match Indicator */}
                    {data.password && data.password_confirmation && (
                        <div className="mt-2 small">
                            {data.password === data.password_confirmation ? (
                                <span className="text-success">
                                    ✓ Passwords match
                                </span>
                            ) : (
                                <span className="text-danger">
                                    ✗ Passwords do not match
                                </span>
                            )}
                        </div>
                    )}
                </Form.Group>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 mb-3 rounded-pill fw-semibold"
                    disabled={processing}
                >
                    {processing ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Resetting password...
                        </>
                    ) : (
                        <>
                            <Shield className="me-2" size={16} />
                            Reset Password
                        </>
                    )}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                    <Link
                        href={route("login")}
                        className="small text-primary text-decoration-none"
                    >
                        Return to Login
                    </Link>
                </div>
            </Form>

            {/* Help Section */}
            <div className="mt-4 pt-3 border-top text-center">
                <p className="small text-secondary mb-2">
                    Having trouble resetting your password?
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link
                        href="/contact"
                        className="small text-primary text-decoration-none"
                    >
                        Contact Support
                    </Link>
                    <span className="text-secondary">•</span>
                    <Link
                        href="/help"
                        className="small text-primary text-decoration-none"
                    >
                        Help Center
                    </Link>
                </div>
            </div>

            {/* Security Notice */}
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                <div
                    className="bg-success rounded-circle"
                    style={{ width: "6px", height: "6px" }}
                />
                <span className="small text-secondary">
                    256-bit encrypted password reset
                </span>
            </div>

            <style type="text/css">{`
                .form-control:focus {
                    border-color: #8B5CF6;
                    box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.25);
                }
                
                .input-group-text {
                    background-color: #f8f9fa;
                }
                
                .btn-primary {
                    background-color: #8B5CF6;
                    border-color: #8B5CF6;
                }
                
                .btn-primary:hover {
                    background-color: #7C3AED;
                    border-color: #7C3AED;
                }
                
                .btn-primary:disabled {
                    background-color: #8B5CF6;
                    border-color: #8B5CF6;
                    opacity: 0.65;
                }
                
                .btn-link {
                    color: #6c757d;
                }
                
                .btn-link:hover {
                    color: #8B5CF6;
                }
                
                .progress {
                    background-color: #e9ecef;
                    border-radius: 2px;
                }
            `}</style>
        </GuestLayout>
    );
}
