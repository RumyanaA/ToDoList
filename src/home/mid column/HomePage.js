import React from "react";
import CookiesJar from './../../CookiesJar';
import axios from "axios";
import moment from "moment";
import { BsPencilSquare } from 'react-icons/bs'
import PubSub from 'pubsub-js'

class HomePage extends CookiesJar {
    constructor(props) {
        super(props);
        this.state = {
            pageNumbers: [],
            itemsToskip: 0,
            tasksToDisplay: [],

        }
        this.FirstPageButton = React.createRef();
        this.PageClicked = this.PageClicked.bind(this)
        this.openEdit = this.openEdit.bind(this)
    }
    openEdit(event) {
        var taskid = event.currentTarget.id
        var selectedTask = this.state.tasksToDisplay.find(item => item._id == taskid)
        var MY_TOPIC = 'Edit task';
        PubSub.publish(MY_TOPIC, selectedTask);
    }
    async PageClicked(event) {

        var nextClickedPage = parseInt(event.target.value)
        var skipNum = nextClickedPage - 1
        skipNum *= 9

        var cookie = this.getCookie('userLogToken');
        var token = cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                skipItemsnum: skipNum
            }
        };
        var result = await axios.get('http://localhost:8081/getPaginationData', config)
        var nextTasks = result.data
        var emptytasksArr = []
        for (var j = 0; j < nextTasks.tasks.length; j++) {
            emptytasksArr.push(nextTasks.tasks[j])
        }
        this.setState({ tasksToDisplay: emptytasksArr, currentPage: nextClickedPage })

    }
    async componentDidMount() {
        var MYotherTOPIC = 'Render topic';
            PubSub.publish(MYotherTOPIC, 'cancel task');
        var cookie = this.getCookie('userLogToken');
        var token = cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                skipItemsnum: '0'
            }
        };
        var res = await axios.get('http://localhost:8081/getPaginationData', config)
        var pageData = res.data;
        var emptyArr = []
        var emptyTasksArr = []
        for (var i = 0; i < pageData.numberOfPages; i++) {
            emptyArr.push(i)
        }

        for (var j = 0; j < pageData.tasks.length; j++) {
            emptyTasksArr.push(pageData.tasks[j])
        }
        this.setState({ pageNumbers: emptyArr, tasksToDisplay: emptyTasksArr })
        this.FirstPageButton.current.focus()
    }
    render() {
        var number = 1;
        return (
            <div>
                <div className='divContainer'>
                    {this.state.tasksToDisplay.map((task) => {
                        return (
                            <div className='taskdiv' >
                                <button id={task._id} onClick={this.openEdit}>
                                    <BsPencilSquare />
                                </button>
                                <p>{task.taskName}</p>
                                <p>{task.taskDescr}</p>
                                <p>{moment(task.dueDate).calendar()}</p>
                            </div>
                        )
                    })
                    }

                </div>
                <ul className='licontainer'>
                    {
                        this.state.pageNumbers.map((num) => {
                            return (
                                <li className='liPagenums'>

                                    <button ref={number + num == 1 ? this.FirstPageButton : undefined} type='button' className='pageButton' value={number + num} onClick={this.PageClicked}>{number + num}</button>

                                </li>

                            )
                        })

                    }

                </ul>
            </div>)
    }
}
export default HomePage;