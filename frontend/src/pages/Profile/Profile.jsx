import React, { useState } from 'react';
import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";
import Avatar from "../../assets/user_example_avatar.png"
import { Image, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Tooltip, Link } from "@nextui-org/react"
import "../../hooks/useMetamask";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    XIcon,
    EmailIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon
} from "react-share";

export default function Profile() {
    const { wallet, hasProvider, isConnecting } = useMetaMask();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [uniqueId, setUniqueId] = useState('');
    const [message, setMessage] = useState('');

    const handleUniqueIdChange = (e) => {
        setUniqueId(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Unique ID:', uniqueId);
        console.log('Message:', message);
        // You can add logic to submit the form data to a backend server or perform any other actions here
    };

    const mongoID = useSelector((state) => state.user.userId)

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <div className="profiler" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="userImage" style={{ borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
                    <Image src={Avatar} alt="User Profile" width={150} height={150} style={{ maxWidth: '100%' }} />
                </div>
                <div className="fine" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <p className="flex items-center font-bold text-left">{wallet.accounts[0]}</p>
                        <Button key="blur" onPress={onOpen} color="primary" style={{ textAlign: "right", marginBottom: "10px" }}>Share Profile</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Share your profile</ModalHeader>
                                        <ModalBody className="flex-col">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1rem" }}>
                                                <Input
                                                    label="Link"
                                                    value={mongoID}
                                                    readOnly
                                                />
                                                <Tooltip content="Copy to clipboard">
                                                    <Button
                                                        color="primary"
                                                        isIconOnly
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                mongoID
                                                            );
                                                        }}>
                                                        <FaRegCopy />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <div className="text-base mt-2">
                                                <p>Share here</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <FacebookShareButton
                                                    url={"https://www.facebook.com"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <TwitterShareButton
                                                    url={"https://twitter.com/home"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <XIcon size={32} round />
                                                </TwitterShareButton>
                                                <TelegramShareButton
                                                    url={"https://web.telegram.org/"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <TelegramIcon size={32} round />
                                                </TelegramShareButton>
                                                <WhatsappShareButton
                                                    url={"https://web.whatsapp.com/"}
                                                    separator=":: "
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                                <LinkedinShareButton
                                                    url={"https://www.linkedin.com/"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <LinkedinIcon size={32} round />
                                                </LinkedinShareButton>
                                                <EmailShareButton
                                                    url={"mailto:"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <EmailIcon size={32} round />
                                                </EmailShareButton>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <Divider style={{ borderTop: "2px solid #9e9d9d", width: "100%" }} />
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {/* Comments container */}
                <Comments />

                {/* Form container */}
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#8f9fe8', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '600px', marginLeft: '20px' }}>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Share Your Thoughts</h2>
                    <div className="form-group">
                        <label htmlFor="uniqueId" style={{ fontWeight: 'bold' }}>Unique ID:</label>
                        <input
                            type="text"
                            id="uniqueId"
                            value={uniqueId}
                            onChange={handleUniqueIdChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '20px' , color:'black'}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" style={{ fontWeight: 'bold' }}>Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={handleMessageChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '20px' ,color:'black'}}
                        ></textarea>
                    </div>
                    <button type="submit" style={{ backgroundColor: '#fff', color: '#8f9fe8', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post</button>
                </form>
            </div>
        </div>
    );
}
