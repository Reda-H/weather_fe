function ThemeContext(props) {
    let theme = 'dark';
    return (
        <div className={`theme-${theme}`}>
            {props.children}
        </div>
    );
}


export default ThemeContext;