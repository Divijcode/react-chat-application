import React, { Component } from "react";
import { Box, Flex, Avatar, Button, Text, Stack, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/core"



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Flex borderBottom="1px solid gray" bg="white" roundedTop="md">
                   
                       
                            <img
                            style={{width:"200px" ,height:"100px"}}
                               
                                src="/logo4.png"
                            />
                            
                        
                    <Box w="100%" p={4} display="flex" flexDirection="row-reverse">
                        
                                
                            
                            <button  type="button" class="btn btn-dark" onClick={this.props.logout}>
                            Logout
                            </button>
        
                    </Box>
                </Flex>
            </React.Fragment>
        )
    }
}

export default Header;