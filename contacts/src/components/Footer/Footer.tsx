import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;
function _Footers() {
    return (
        <AntFooter style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', padding: '20px 0',background:'#001529'}}>
            <div style={{color:'#ccc'}}>
                <p>Контактная информация: iitu-student@gmail.com</p>
                <p>Телефон: +1 234 567 890</p>
                <p>&copy; {new Date().getFullYear()} Contact Data. Все права защищены.</p>
            </div>
        </AntFooter>
    );
}

export default _Footers;