import {Header} from "antd/es/layout/layout";
import {Button, Menu } from "antd";
import { HomeOutlined, PlusOutlined} from "@ant-design/icons";
import {header} from "./HeaderStyle.ts";
import {Link, useNavigate} from "react-router-dom";


function _Header() {
    const navigate = useNavigate()

    return (
        <>
            <Header style={header}>
                <div>
                    <a href={'#'}><h2>Contact data</h2></a>
                </div>
                <Menu theme="dark"  mode="horizontal" defaultSelectedKeys={['3']}>
                    <Menu.Item key="1" icon={<PlusOutlined />}>
                        <Button type={'primary'} onClick={() =>  navigate('/add')}>Add new Contact</Button>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HomeOutlined/>}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </>
    );
}

export default _Header;