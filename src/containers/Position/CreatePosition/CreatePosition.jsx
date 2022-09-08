
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { userData } from "../../User/userSlice";
import { registerPosition, selectPosition } from "../positionsSlice";
import './CreatePosition.scss'

const CreatePosition = () => {
    const userInfo = useSelector(userData)
    const positionsInfo = useSelector(selectPosition)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

    // data related to skill search
    let [skillLists, setSkillLists] = useState({
        userSkillList: [],
        otherSkillList: [],
        searchWord: ""
    })

    useEffect(() => {
        if (!userInfo?.data || userInfo?.data.role_id != recruiterRoleId) {
            navigate('/')
        }
        const fetchSkills = async () => {
            await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-all')
                .then(resp => {
                    setSkillLists({
                        ...skillLists,
                        otherSkillList: resp.data
                    })
                }).then(resp => {
                    console.log(skillLists.otherSkillList)
                }).catch((error) => {
                    console.log(error)
                })
        }
        fetchSkills()
    }, [])

    const [register, setRegister] = useState({
        title: '',
        description: '',
        companyName: '',
        location: '',
        mode: '',
        salary: '',
        isError: false,
        message: ''
    })

    // handler to update hook with info from form fields
    const handleInput = (event) => {
        setRegister({
            ...register,
            [event.target.name]: event.target.value
        })
    }
    // test if the info stored in hook is correct and register position in that case
    const positionRegister = async (event) => {
        event.preventDefault()

        // function to set an error with custon message in register hook
        const setRegisterError = (value, message) => {
            setRegister({
                ...register,
                isError: value,
                message: message
            });
        }

        // form inputs to validate
        const validations = [
            ['title', register.title, 'Invalid title format'],
            ['company_name', register.companyName, 'Invalid company name format'],
            ['location', register.location, 'Invalid location format'],
            ['mode', register.mode, 'Invalid mode format'],
            ['salary', register.salary, 'Invalid salary format'],
        ]

        // apply evals and register position if everything is ok
        for (let index in validations) {
            if (!evalField(validations[index][0], validations[index][1])) {
                setRegisterError(true, validations[index][2])
                return
            } else if (index == validations.length - 1) {
                setRegisterError(false, '')
                const userToken = userInfo?.token
                dispatch(registerPosition(register.title, register.description, register.companyName, register.location, register.mode, register.salary, userToken))
                setTimeout(() => navigate("/"), 3000)
            }
        }
    }

    return (
        <div id="CreatePosition">
            <div className="mainBox">
                <p>Create new position</p>
                <form onSubmit={positionRegister}>
                    <div className="registerItem">
                        <label className="registerLabel">Title</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="title" />
                    </div>

                    <div className="registerItem">
                        <label className="registerLabel">Company name</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="companyName" />
                    </div>

                    <div className="registerItem">
                        <label className="registerLabel">Location</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="location" />
                    </div>

                    <div className="registerItem">
                        <label className="registerLabel">Mode</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="mode" />
                    </div>

                    <div className="registerItem">
                        <label className="registerLabel">Salary</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="salary" />
                    </div>

                    <div className="registerItem">
                        <label className="registerLabel">Description</label>
                        <input className="registerInput" onChange={handleInput} type="text" name="description" />
                    </div>

                    <div className="registerItem">
                        <button className="registerSubmit" type="submit">Register</button>
                    </div>
                </form>
                <p className="errorMessage">{register.isError ? register.message : ''}</p>
                <p className="errorMessage">{positionsInfo.isError ? positionsInfo.errorMessage : positionsInfo.successMessage}</p>
            </div>
        </div>
    )
}

export default CreatePosition