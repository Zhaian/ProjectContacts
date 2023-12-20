import {useNavigate, useParams} from "react-router-dom";
import isValidHttpUrl from "../../utils/vaildImage.ts";
import {Input, List, message, Skeleton} from "antd";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {editData} from "../../features/contacts/contact.ts";
import  './edit.css'

const EditComponent = () => {
const {edit} = useParams()
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch()
    const {isLoading,contacts} = useAppSelector((state) => state.contact)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id:'',
        phone:'',
        name:'',
        email:'',
        image:''
    })

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Сохранен',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Ошибка',
        });
    };

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Заполните все поля',
        });
    };

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }
    const submitData = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formData.name.trim() === '' || formData.image === '' || formData.email.trim() === '' || formData.phone === '') {
            warning();
            return;
        }

        if (isValidHttpUrl(formData.image)) {
            await dispatch(editData({id: formData.id, payload: formData}));
            success();
            navigate(-1);
        } else {
            error();
        }
    }

    useEffect(() => {
        const index =   contacts.findIndex((val) => {
            return val.id === edit
        })

        if (index >= 0) {
            setFormData({
                ...contacts[index]

            })
        }
    },[edit])

    return (
        <>
            {
                isLoading ? (
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
                        {contextHolder}
                        <h2 style={{textAlign:"center", marginBottom:30}}>Edit Contact Data</h2>
                        <form onSubmit={submitData}>
                            <Input
                                name={'name'}
                                value={formData.name}
                                type={'text'}
                                placeholder={'Enter a name to edit'}
                                onChange={handleInputChange}/>
                            <Input
                                name={'email'}
                                value={formData.email}
                                type={'text'}
                                placeholder={'Enter a email to edit'}
                                onChange={handleInputChange}/>
                            <Input
                                name={'phone'}
                                value={formData.phone}
                                type={'text'}
                                placeholder={'Enter a phone to edit'}
                                onChange={handleInputChange}/>
                            <Input
                                name={'image'}
                                value={formData.image}
                                type={'text'}
                                placeholder={'Enter a image link to edit'}
                                onChange={handleInputChange}/>
                            <button
                                className='my-button'
                                type={'submit'}
                            >Submit</button>
                            <button
                                className='my-button'
                                onClick={() => navigate(-1)}>
                                Escape
                            </button>
                        </form>
                    </>
                )
            }

        </>
    );
};

export default EditComponent;
