import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';
const Navbar = () => {
    return (
        <HStack align={'center'} justify={'space-between'} p={'1rem 2.6rem'} className={styles.container} bgColor={'#0e1823'}>
            <Text fontWeight={'700'} fontSize={'1.7rem'} color={'#d2ae6d'}>MyConverter</Text>
            <HStack gap={'1rem'} fontSize={'1.3rem'}>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>Services</Link>
                <Link to={'/'}>Login</Link>
                <Link to={'/'}>Signup</Link>
            </HStack>
        </HStack>
    )
}

export default Navbar