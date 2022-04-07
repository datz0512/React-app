import clsx from 'clsx'
import styles from './Button.module.scss'

const Button = props => {
    const classes = clsx(styles.btn, 'd-flex', {
        [styles.primary]: props.primary,
        [styles.secondary]: props.secondary,
    })

    return (
        <button className={classes}>
            Click me!!!
        </button>
    )
}

export default Button