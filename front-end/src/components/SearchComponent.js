import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { fetchPrograms } from "../redux/ActionCreators";
import { Loading } from "./LoadingComponent";

class SearchProgram extends Component {
    state = {
        query: '',
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
                                style={{ backgroundColor: program.colorCode }}
                                dangerouslySetInnerHTML={this.getName(program.name)}>
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
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPrograms: (name) => dispatch(fetchPrograms(name))
})

const mapStateToProps = (state, ownProps) => {
    return {
        programs: state.programs
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchProgram);