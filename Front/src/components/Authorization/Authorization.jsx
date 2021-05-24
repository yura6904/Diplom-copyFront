import './Authorization.css';
import 'materialize-css';

const Authorization = (props) => {
    return (
        <div className = 'row'>
            <div className = 'col s6 offset-s3'> 
                <div className = 'card blue darken-3'>
                    <div className = 'card-content white-text'>
                        <span className = 'card-title'>Авторизация</span>
                        <div>
                            <div className = 'input-field'>
                                <input id = 'email' type = 'text' name = 'email' className = 'authInput' onChange = {props.changeHandler}/>
                                <label htmlFor = 'email'>Email</label>
                            </div>
                            <div className = 'input-field'>
                                <input id = 'password' type = 'password' name = 'password' className = 'authInput'  onChange = {props.changeHandler}/>
                                <label htmlFor = 'password'>Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className = 'card-action'>
                        <button className = 'btn red darken-4' style = {{marginRight: 10}} onClick = {props.loginHandler} disabled = {props.loading}>Войти</button>
                        <button className = 'btn grey lighten-1 black-text' style = {{marginRight: 10}} onClick = {props.registerHandler} disabled = {props.loading}>Регистрация</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Authorization;