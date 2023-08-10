import Link from "next/link"

const links = [
    {
        label: 'home',
        route: '/'
    },
    {
        label: 'Calculator',
        route: '/calc'
    }
]

const Navigation = () => {
    return (
        <header>
            <nav>
                <ul>
                    {links.map(({ label, route }) => (
                        <li key={route}>
                            <Link href={route}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Navigation