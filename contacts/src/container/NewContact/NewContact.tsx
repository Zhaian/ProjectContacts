import {Input, List, message, Skeleton} from "antd";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {addNewContact} from "../../features/contacts/contact.ts";
import {useNavigate} from "react-router-dom";
import isValidHttpUrl from "../../utils/vaildImage.ts";
import '../EditData/edit.css'


const NewContact = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const {isLoading} = useAppSelector((state) => state.contact)
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

    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        name:'',
        email:'',
        phone:'',
        image:''
    });


    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const{name,value} = e.target

        setForm((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }


    const onSubmitData = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.name.trim() === '' || form.image.trim() === '' || form.email === '' ||  form.phone === '') {
            warning()
            return;
        }
        if (isValidHttpUrl(form.image)) {
           await dispatch(addNewContact({
                name:form.name,
                phone:form.phone,
                email:form.email,
                image:form.image
            }))
            success();
            navigate(-1);

        } else {
            error();
        }

    }
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
                   <h2 style={{textAlign:'center'}}>Add New Contact Data</h2>
                   <form onSubmit={onSubmitData}>
                       <Input
                           name={'name'}
                           value={form.name}
                           type={'text'}
                           placeholder={'Enter your name'}
                           onChange={onInputChangeHandler}/>
                       <Input
                           name={'email'}
                           value={form.email}
                           type={'text'}
                           placeholder={'Enter your email'}
                           onChange={onInputChangeHandler}/>
                       <Input
                           name={'phone'}
                           value={form.phone}
                           type={'text'}
                           placeholder={'Enter your phone'}
                           onChange={onInputChangeHandler}/>
                       <Input
                           name={'image'}
                           value={form.image}
                           type={'text'}
                           placeholder={'Enter your image'}
                           onChange={onInputChangeHandler}/>
                       <div>
                           <button
                               className={'my-button'}
                               type={'submit'}>
                               Save
                           </button>
                           <button
                               className={'my-button'}
                               onClick={() => navigate(-1)}>
                               Back to contacts
                           </button>
                       </div>
                       <label>
                           Photo Preview:
                           <img alt={form.name} src={form.image} style={{width:200,height:200 ,marginTop:50}}/>
                       </label>
                   </form>
               </>
           )
       }

       </>
    );
};

export default NewContact;
