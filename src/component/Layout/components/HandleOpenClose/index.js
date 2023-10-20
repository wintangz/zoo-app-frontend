import { useState } from 'react';

export function HandleOpenClose() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showInputNewPassword, setShowInputNewPassword] = useState(false);
    const [showVertify, setShowVertify] = useState(false);

    const handleLoginFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
    };

    const handleRegisterFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(false);
        setShowRegister(true);
        setShowForgotPassword(false);
    };

    const handleForgotPasswordFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
    };

    const handleInputNewPasswordClick = (event) => {
        event.stopPropagation();
        setShowForgotPassword(false);
        setShowInputNewPassword(true);
    };

    const handleVertifyClick = (event) => {
        event.stopPropagation();
        setShowForgotPassword(false);
        setShowInputNewPassword(false);
        setShowVertify(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleCloseRegister = () => {
        setShowRegister(false);
    };

    const handleCloseForgotPassword = () => {
        setShowForgotPassword(false);
    };

    const handleCloseInputNewPassword = () => {
        setShowInputNewPassword(false);
    };

    const handleCloseVertify = () => {
        setShowVertify(false);
    };


    return {
        showLogin,
        showRegister,
        showForgotPassword,
        showInputNewPassword,
        showVertify,

        handleLoginFormClick,
        handleRegisterFormClick,
        handleForgotPasswordFormClick,
        handleInputNewPasswordClick,
        handleVertifyClick,

        handleCloseLogin,
        handleCloseRegister,
        handleCloseForgotPassword,
        handleCloseInputNewPassword,
        handleCloseVertify,
    };
}