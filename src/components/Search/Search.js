import React, { Component } from 'react';
import classes from './search.module.css';
import {
    InputGroup,
    FormControl,
    Button,
    SplitButton,
    Dropdown,
    Navbar,
    Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';



class Search extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            search: '',
            sortId: '',
            sortTitle: '',
            filterId: '',
            filterTitle: '',
            date: ''
        };

        this.state = this.defaultState;
    }


    sort = [
        {
            id: 'none',
            title: 'None'
        },
        {
            id: 'a-z',
            title: 'a-z'
        },
        {
            id: 'z-a',
            title: 'z-a'
        },
        {
            id: 'creation_date_oldest',
            title: 'Creation date oldest'
        },
        {
            id: 'creation_date_newest',
            title: 'Creation date newest'
        },
        {
            id: 'completion_date_oldest',
            title: 'Compl. date oldest'
        },
        {
            id: 'completion_date_newest',
            title: 'Compl. date newest'
        }];

    filter = [
        {
            id: 'none',
            title: 'None'
        },
        {
            id: 'create_lt',
            title: 'Created before'
        },
        {
            id: 'create_gt',
            title: 'Created after'
        },
        {
            id: 'complete_lt',
            title: 'Complete before'
        },
        {
            id: 'complete_gt',
            title: 'Complete after'
        }];


    inputChangeHandler = (event) => {
        this.setState({ search: event.target.value });
    }

    submitHandler = (type) => (event) => {
        if (type === 'reset') {
            this.props.onSubmit({});
            this.setState(this.defaultState);
        }

        if ((!type && event.key === 'Enter') || type === 'submit') {
            const { sortId, search, filterId, date } = this.state;
            const data = {
                search: search,
                sort: sortId
            };
            if (filterId && date) {
                data[filterId] = date;
            }
            this.props.onSubmit(data);
            this.setState(this.defaultState);
        }


    }

    selectHandler = (type, id, title) => () => {
        if (id === 'none') {
            this.setState({ [type + 'Id']: '', [type + 'Title']: '' });
        }
        else {
            this.setState({ [type + 'Id']: id, [type + 'Title']: title });
        }
    }

    dateChangeHandler = (event) => {
        this.setState({ date: event.target.value });
    }

    render() {

        const { sortId, search, sortTitle, filterTitle, filterId, date } = this.state;

        return (
            <>
                <Navbar >
                    <Nav className="mr-auto">
                        <SplitButton
                            variant='primary'
                            title={sortTitle || 'Sort'}
                        >
                            {this.sort.map(({ id, title }) =>
                                <Dropdown.Item
                                    key={id}
                                    onClick={this.selectHandler('sort', id, title)}
                                    className={`${sortId === id ? classes.active : ''} ${classes.sortItem}`}
                                >
                                    {title}
                                </Dropdown.Item>)
                            }
                        </SplitButton>


                        <SplitButton
                            style = {{margin:'0 15px'}}
                            variant='primary'
                            title={filterTitle || 'Filter'}
                        >
                            {this.filter.map(({ id, title }) =>
                                <Dropdown.Item
                                    key={id}
                                    onClick={this.selectHandler('filter', id, title)}
                                    className={`${filterId === id ? classes.active : ''} ${classes.sortItem}`}
                                >
                                    {title}
                                </Dropdown.Item>)
                            }
                        </SplitButton>
                        <input type="date" value={date} onChange={this.dateChangeHandler} />
                    </Nav>
                    <FormControl
                        style={{ maxWidth: '400px' }}
                        placeholder="Create new task"
                        aria-label="Create new task"
                        aria-describedby="basic-addon2"
                        value={search}
                        onChange={this.inputChangeHandler}
                        onKeyDown={this.submitHandler()}
                    />
                    <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.submitHandler('submit')}

                    >
                        Search
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={this.submitHandler('reset')}
                >
                    Reset
                </Button>
                    </InputGroup.Append>
                </Navbar>
            </>
        );
    }
}

Search.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default Search;