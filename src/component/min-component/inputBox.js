import React, { Component } from "react";
import { Box, Input, InputGroup, InputRightElement, Button, Text, Grid } from "@chakra-ui/core"
import { database } from "firebase/app";
// require('firebase/database');
// import "firebase/database";
// require('firebase/database');

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            text: ""
        }
    }
   
    sendMessage = (event) => {
        event.preventDefault();
        if (this.state.text.trim() !== "") {
            database().ref(this.props.roomName).push().set({
                uid: this.props.userId,
                time: Date.now(),
                name: this.props.userName,
                text: this.state.text
            });
            this.setState({ text: "" })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Box position="absolute" bottom="0" w="100%" h="50px" shadow="lg" borderBottomRightRadius="4px">
                    <form onSubmit={this.sendMessage} style={{ height: "100%" }}>
                        <InputGroup size="md" h="100%">
                            <Input
                                h="100%"
                                pr="2rem"
                                type="text"
                                placeholder="Type Your Message"
                                variant="filled"
                                borderTop="1px solid teal"
                                bg="white"
                                _focus={{ boxShadow: "none" }}
                                _hover={{ borderTop: "1px solid teal" }}
                                onFocus={() => this.setState()}
                                onChange={(e) => { this.setState({ text: e.target.value }) }}
                                value={this.state.text}
                            />
                            <InputRightElement h="100%">
                                <Button background="none" _hover="none" >
                                    {/* <Text fontSize="2xl">☺</Text> */}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </form>
                </Box>
               
            </React.Fragment>
        )
    }
}

export default InputBox;