import React from 'react';
import NextLink from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import { HamburgerIcon } from '@chakra-ui/icons';
import { GiNinjaStar } from 'react-icons/gi';
import { User as user } from '../constant/_data';
import { motion } from 'framer-motion';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  useColorMode,
  Text,
} from '@chakra-ui/react';

export type Navbar = {
  path?: any;
};

const LinkItem = ({ href, path, target, children, ...props }: any) => {
  const active = path.asPath === href;
  const inactiveColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const activeColor = useColorModeValue('#000', '#fff');
  const { colorMode } = useColorMode();

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        fontSize={'sm'}
        fontWeight={active ? 'semibold' : 'normal'}
        as={NextLink}
        href={href}
        scroll={false}
        px={2}
        py={1}
        transition={'background 0.4 s ease-in-out'}
        _hover={{
          bg: 'rgba(128, 0, 128, 0.4)',
          color: colorMode === 'dark' ? 'white' : 'black',
          borderBottom: `2px solid ${activeColor}`,
        }}
        borderBottom={active ? `2px solid ${activeColor}` : undefined}
        color={active ? activeColor : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
};

const MenuLink = React.forwardRef((props: any, ref: any) => (
  <Link ref={ref} as={NextLink} {...props} />
));

// Fix Eslint issue for MenuLink displayname not assigned
MenuLink.displayName = '';

const Navbar: React.FC<Navbar> = props => {
  const { path } = props;
  const { colorMode } = useColorMode();
  // const activeColor = useColorModeValue('#383838', '#cbcbcb')

  return (
    <Box
      position='fixed'
      as='nav'
      w='100%'
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display='flex'
        p={2}
        maxW='container.md'
        flexWrap='wrap'
        textAlign='end'
        justifyItems='space-between'
      >
        <Link
          as={NextLink}
          scroll={false}
          href='/'
          alignContent={'center'}
          textColor={colorMode === 'dark' ? 'gray.100' : 'gray.900'}
          style={{ textDecoration: 'none' }}
        >
          <Flex align='center' mr={5}>
            <Heading
              as='h1'
              size='lg'
              display={'contents'}
              letterSpacing={'tighter'}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: '100%',
                }}
              >
                <GiNinjaStar />
              </motion.div>
              <Text
                ml={1}
                fontSize={'sm'}
                letterSpacing={'widest'}
                style={{ textTransform: 'uppercase' }}
              >
                {user.devName}
              </Text>
            </Heading>
          </Flex>
        </Link>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems='center'
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href='/' path={path}>
            Introduction
          </LinkItem>
          <LinkItem href='/experience' path={path}>
            Experience
          </LinkItem>
          <LinkItem href='/projects' path={path}>
            Projects
          </LinkItem>
          <LinkItem href='/about' path={path}>
            About Me
          </LinkItem>
        </Stack>

        <Box flex={1} textAlign='end'>
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id='navbar-menu'>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant='outline'
                aria-label='Options'
              />
              <MenuList>
                <MenuItem
                  as={MenuLink}
                  href='/'
                  text={'Introduction'}
                  textDecoration={
                    isCurrentHref(path.asPath, '/') ? 'underline' : ''
                  }
                >
                  Introduction
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href='/experience'
                  text={'Experience'}
                  textDecoration={
                    isCurrentHref(path.asPath, '/experience') ? 'underline' : ''
                  }
                >
                  Experience
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href='/projects'
                  text={'Experience'}
                  textDecoration={
                    isCurrentHref(path.asPath, '/projects') ? 'underline' : ''
                  }
                >
                  Projects
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href='/about'
                  text={'About Me'}
                  textDecoration={
                    isCurrentHref(path.asPath, '/about') ? 'underline' : ''
                  }
                >
                  About Me
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

const isCurrentHref = (href, path) => path === href;
