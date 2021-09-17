import React from "react";
import CookiesJar from './../../CookiesJar';
import axios from "axios";
import moment from "moment";
import { BsPencilSquare } from 'react-icons/bs'
import PubSub from 'pubsub-js';
import Storage from "../../Storage";

class HomePage extends CookiesJar {
    constructor(props) {
        super(props);
        this.state = {
            pageNumbers: [],
            itemsToskip: 0,
            tasksToDisplay: [],
            checkedCategories: []

        }
        this.FirstPageButton = React.createRef();
        this.PageClicked = this.PageClicked.bind(this)
        this.openEdit = this.openEdit.bind(this);
        this.editTask = this.editTask.bind(this);
        this.manageCategory = this.manageCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }
    openEdit(event) {
        var taskid = event.currentTarget.id
        var selectedTask = this.state.tasksToDisplay.find(item => item._id == taskid)
        var MY_TOPIC = 'Edit task';
        PubSub.publish(MY_TOPIC, selectedTask);
    }
    editTask(msg, data) {
        var prevState = this.state.tasksToDisplay;
        var editedTask = Storage.getItem('_id', data.id, 'tasks')
        var index = prevState.findIndex(item => item._id == editedTask._id)
        if (index > -1) {
            prevState[index] = editedTask
            this.setState(prevState)
        }
    }
    getCategories(msg, data) {

        var catNames = []
        for (var i = 0; i < data.length; i++) {
            catNames.push(data[i].name)
        }
        this.setState({ checkedCategories: catNames })
    }
    manageCategory(msg, data) {
        var oldstate = this.state.checkedCategories
        oldstate.length = 0
        for(var i=0;i<data.length;i++){
            oldstate.push(data[i])
        }
        
        this.setState({ checkCategories: oldstate })

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
            Storage.setItem(nextTasks.tasks[j], 'tasks')
        }
        this.setState({ tasksToDisplay: emptytasksArr, currentPage: nextClickedPage })

    }
    async componentDidMount() {
        var categories=[]
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
        categories=Storage.getPropValues('name','isChecked',true,'categories')
        this.setState({checkedCategories:categories})
        for (var j = 0; j < pageData.tasks.length; j++) {
            
            emptyTasksArr.push(pageData.tasks[j])
            Storage.setItem(pageData.tasks[j], 'tasks')
        }
        this.setState({ pageNumbers: emptyArr, tasksToDisplay: emptyTasksArr })
        this.FirstPageButton.current.focus()
        PubSub.subscribe('change Event', this.editTask);
        PubSub.subscribe('manage category', this.manageCategory);
        PubSub.subscribe('get categories', this.getCategories)
    }
    render() {
        var number = 1;
        var currentCheckedCat=this.state.checkedCategories
        return (
            <div>
                <div className='divContainer'>
                    {this.state.tasksToDisplay.map((task) => {
                        if (currentCheckedCat.includes(task.category)) {
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
                        } else {
                            return (null)
                        }
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