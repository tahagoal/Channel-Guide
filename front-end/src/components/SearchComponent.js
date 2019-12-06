import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Form, FormGroup, ListGroup, ListGroupItem, Modal } from "reactstrap";
import { fetchPrograms, fetchProgramDetails } from "../redux/ActionCreators";
import ModalProgram from "./ProgramModal";
import { Loading } from "./LoadingComponent";

class SearchProgram extends Component {
    state = {
        isModalOpen: false,
        query: ''
    }

    constructor(props) {
        super(props);
        this.program_info = this.program_info.bind(this);
    }

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    program_info(program_id) {
        this.props.fetchProgramDetails(program_id);
        this.toggle();
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })

        var id = window.setTimeout(
            function() {
                if(this.search != undefined)
                    this.props.fetchPrograms(this.search.value);
            }
            .bind(this),
            300
            );

        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
    }

    getName(pName){
        if(!this.search.value || !pName)
            return(
                {
                __html:
                    ""
                }
                
            )
        else{
            let str1 = (pName).split(this.search.value)[0];
            let str2 = this.search.value;
            let str3 = (pName).split(this.search.value)[1];
            if(str3 == undefined){
                return(
                    {
                    __html:
                    str1 + ` <b>(${str2})</b>`
                    }
                    
                )
            }
            else{
                return({
                    __html:
                    str1 + `<b>${str2}</b>` + str3
                    }
                )
            }
        }
    }

    render() {
        
        const ProgramsList = ({ programs, pending, err }) => {
            if (pending && this.state.query != '') {
                return <Loading />;
            } else if (err) {
                return <h4>{err}</h4>;
            } else if (programs && this.state.query) {                
                return (
                    programs.map((program) => {
                        let divStyle = {
                            bacground: program.colorCode
                        }
                        return (
                            <ListGroupItem key={program.id} style={divStyle} 
                                style={{ color: program.colorCode }}
                                dangerouslySetInnerHTML={this.getName(program.name)}
                                onClick={() => {this.program_info(program.id)}}>
                            </ListGroupItem>
                        )
                    })
                )
            }
            else{
                return(
                    <div></div>
                )
            }

        }

        return (
            <div>
                <Form>
                    <FormGroup>
                        <input
                            placeholder="Search for Program..." type="text" className="form-control"
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                </Form>
                <div className="suggested-list">
                    <ListGroup>
                        <ProgramsList
                            programs={this.props.programs.programs}
                            pending={this.props.programs.pending}
                            error={this.props.programs.err} />
                    </ListGroup>
                </div>
                <Modal isOpen={this.state.isModalOpen} 
                toggle={() => { this.toggle() }}
                size="lg">
                    <ModalProgram
                    program={this.props.programdetails.programdetails}
                    pending={this.props.programdetails.pending}
                    error={this.props.programdetails.err}
                    />
                </Modal>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     fetchPrograms: (name) => dispatch(fetchPrograms(name))
// })

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ fetchPrograms, fetchProgramDetails }, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        programs: state.programs,
        programdetails: state.programdetails
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchProgram);