export default function Header(Props){
    const { handleToggleMenu } = Props;

    return(
        <header>
            <button onClick={handleToggleMenu} className="open-nav-button">
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1 className="text-gradient">Pokédex</h1>
        </header>
    )
}