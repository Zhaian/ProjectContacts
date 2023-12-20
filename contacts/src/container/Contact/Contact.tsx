import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import IContact, {deleteData, getContact} from "../../features/contacts/contact.ts";
import {Button, Card, Col, List, Modal, Skeleton} from 'antd';
import 'antd/dist/reset.css'
import {container, imageCard} from "./contactStyle.ts";
import {useNavigate} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


const Contact = () => {


    const dispatch = useAppDispatch()
    const {isLoading,contacts} = useAppSelector((state) => state.contact)
    const navigate = useNavigate()

    const [selectedData, setSelectedData] = useState<IContact | null>(null)

    const handleCardClick = (contact: IContact) => {
        setSelectedData(contact);
        showModal();
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getContact())
    },[dispatch])

    const deleteHandler = (id:string) => {
        dispatch(deleteData(id))
        handleCancel()


    }


    return (
        <div style={container}>
            {isLoading ? (
                <List
                    grid={{ gutter: 12, column: 3 }}
                    dataSource={[1, 2, 3]}
                    renderItem={(index) => (
                        <List.Item key={index}>
                            <Skeleton loading={true} active />
                        </List.Item>
                    )}
                />
            ) : (
                <>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={contacts}
                        renderItem={(contact) => (
                            <List.Item>
                                <Col span={24} >
                                    <Card
                                        cover={<img alt={contact.name} src={contact.image} style={imageCard} />}
                                        hoverable
                                    >
                                        <Card.Meta  title={contact.name}/>
                                        <div style={{marginTop:20}}>
                                            <Button type={'dashed'} onClick={() => handleCardClick(contact)}>View</Button>
                                        </div>
                                    </Card>
                                </Col>
                            </List.Item>
                        )}


                    />
                    <Modal title="Contact Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {
                            selectedData && (
                                <>
                                    <img alt={selectedData.name} src={selectedData.image} style={imageCard}/>
                                    <p>Name: {selectedData.name}</p>
                                    <p>Email: {selectedData.email}</p>
                                    <p>Phone: {selectedData.phone}</p>
                                    <Button
                                        icon={<EditOutlined />}
                                        style={{marginRight:10}}
                                        type={'primary'} onClick={() => navigate(`/${selectedData?.id}`)}
                                    >Edit</Button>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        type={'primary'}
                                        onClick={() => deleteHandler(selectedData?.id)}>
                                        Delete</Button>
                                </>
                            )
                        }
                    </Modal>
                </>
            )}

        </div>
    );
};

export default Contact;
