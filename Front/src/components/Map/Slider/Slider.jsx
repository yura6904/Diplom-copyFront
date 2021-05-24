import React from 'react';
import './Slider.css';

const Slider = (props) => {
    //'elements_card'
    return (        
        <div className = 'slide_container'>
            <div className = 'slides'>            
                {props.elementsArray.map((elements, index) => {
                    return (
                        <div className = 'elements_card' key = {index}>
                                <div className = 'elements_card_image'>
                                    <img src = {elements.img} alt = ''/>
                                    </div>
                                <div className = 'elements_name'>{elements.name}</div>
                                <div className = 'elements_description'>
                                    {elements.info}
                                </div>
                                <input className = {elements.checked ? 'active_check' : 'check'} 
                                    type = 'button' value = {elements.checked ? 'Убрать' : 'Выбрать'} 
                                    onClick = {() => {debugger ; props.chooseElements(elements._id, index)}}>                                    
                                </input>
                        </div>
                    );                                                               
                })}
            </div>
            <a className='slider_control slider_control_prev' id = 'swipe' href = '#'
                onClick = {() => {props.changeElements(false, props.showElements); props.swipeSlider(1)}}>
                <span></span>
            </a>
            <a className='slider_control slider_control_next' id = 'swipe' href = '#'
                onClick = {() => {props.changeElements(true, props.showElements); props.swipeSlider(2)}}>
                    <span></span>
            </a>
        </div>    
    );
}
export default Slider;