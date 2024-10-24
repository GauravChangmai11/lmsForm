import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik, useFormik} from "formik"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function UserForm(){
    const [fileError, setFileError] = useState('')

    const [formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        employeeId:'',
        designation:'',
        contactNo:'',
        email:'',
        fullName:'',
        bankName:'',
        accountNo:'',
        ifscCode:'',
        expenseType:'',
        department:'',
        month:'',
        amount:'',
        details:'',
        userFile:''
    })

    const handleUploadFile = (event)=>{
        const selectedFile = event.target.files[0]
        formik.setFieldValue('userFile',selectedFile)

        // const fileSizeLimit = 5 * 1024 * 1024
        // if(selectedFile && selectedFile.size > fileSizeLimit){
        //     setFileError('File must be less than 1 MB')
        //     formik.setFieldError('userFile','')
        // }
        // else{
        //     formik.setFieldValue('userFile',selectedFile)
        //     setFileError('')
        // }
    }

    const validation = Yup.object({
        firstName:Yup.string()
        .required("First Name is required")
        .max(20, "Maximum 20 characters are allowed"),

        lastName:Yup.string()
        .required("First Name is required")
        .max(20, "Maximum 20 characters are allowed"),

        employeeId:Yup.string()
        .matches("^CBIIND\\d{3}$","Invalid format")
        .required("Employee Id is required"),

        designation:Yup.string()
        .required("Designation is required"),

        contactNo:Yup.string()
        .typeError("Must be a 10 digit number1")
        .matches("^\\d{10}$", "Must be a 10 digit number")
        .required("Contact Number is required"),

        email: Yup.string()
        .required("Email is required")
        .email("Invalid Email Format"),

        fullName:Yup.string()
        .required("Full Name is required"),

        bankName:Yup.string()
        .required("Bank Name is required"),

        accountNo:Yup.string()
        .required("Account No. is required"),

        ifscCode:Yup.string()
        .required("IFSC Code is required"),
        
        expenseType:Yup.string()
        .required("Expense Type is required"),

        department:Yup.string()
        .required("Department is required"),

        month:Yup.string()
        .required("Month is required"),

        amount:Yup.number()
        .typeError("Must be a number")
        .required("Amount is required"),

        details:Yup.string(),

        userFile:Yup.mixed().required("File is required").test('fileSize','File is too long',(value)=>(value && value.size <= 2*1024*1024))
    })


    const formik = useFormik({
        initialValues:formData,
        validationSchema:validation,
        enableReinitialize:true,
        onSubmit:(values)=>{
            console.log(values)
            handleSubmmit(values)
        }
    })


    const handleSubmmit=(values)=>{
        console.log(values)
        const userFormData = new FormData()
        console.log(userFormData)
        for(const [key,value] of Object.entries(values)){
            userFormData.append(key,value)
        }
        
        for (let [key,value] of userFormData.entries()){
            console.log(key,value)
        }
    }

    return(
        <Box 
        sx={{ 
            boxShadow:5,
            background:'white',
            py:6,
            px:8,
            mx:4,
            my:3,

        }}>
            <Formik>
            <Form onSubmit={formik.handleSubmit}>
            <Box 
            sx={{borderRadius:2, border:'5px solid lightgray', mb:5, boxShadow:3}}
            >
                <Typography
                variant='h6'
                textAlign={'center'}
                sx={{background:'lightgray', 
                    borderRadius:0,
                    py:3}}
                fullWidth
                >
                    Employee Details
                </Typography>

                <Grid2 container 
                columnSpacing={6} 
                rowSpacing={4}
                columns={12}
                px={7}
                py={5}
                >
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField 
                        label="First Name"
                        placeholder='Enter first name'
                        fullWidth
                        name='firstName'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        />
                        {   formik.errors.firstName && formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.firstName}
                            </Box>
                        }
                    </Grid2>
                   
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Last Name"
                        name='lastName'
                        placeholder='Enter last name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.lastName &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.lastName}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Employee ID"    
                        name='employeeId'
                        placeholder='Enter employee ID'
                        value={formik.values.employeeId}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.employeeId &&
                            formik.touched.employeeId &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.employeeId}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Designation"   
                        name='designation'
                        placeholder='Enter designation'
                        value={formik.values.designation}
                        onChange={formik.handleChange} 
                        fullWidth
                        />
                        {
                            formik.errors.designation &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.designation}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Contact Number"    
                        name='contactNo'
                        placeholder='Enter contact Number'
                        value={formik.values.contactNo}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.contactNo &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.contactNo}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Email"   
                        name='email'
                        placeholder='Enter email id'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.email &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.email}
                            </Box>
                        }
                    </Grid2>
                </Grid2>
            </Box>
            <Box 
            sx={{borderRadius:2, border:'5px solid lightgray', mb:5, boxShadow:3}}
            >
                <Typography
                variant='h6'
                textAlign={'center'}
                sx={{background:'lightgray', py:3}}
                >
                    Account Details
                </Typography>

                <Grid2 container 
                columnSpacing={6} 
                rowSpacing={4}
                columns={12}
                px={7}
                py={5}
                >
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        name="fullName"
                        placeholder='Enter full name'
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        label="Full Name"
                        fullWidth    
                        />
                        {
                            formik.errors.fullName && 
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.fullName}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Bank Name"
                        name='bankName'
                        placeholder='Enter bank name'
                        value={formik.values.bankName}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.bankName &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.bankName}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Account Number"  
                        name='accountNo'  
                        placeholder='Enter account number'
                        value={formik.values.accountNo}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.accountNo &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.accountNo}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        name='ifscCode'  
                        placeholder='Enter ifsc code'
                        value={formik.values.ifscCode}
                        onChange={formik.handleChange}
                        label="IFSC Code"    
                        fullWidth
                        />
                        {
                            formik.errors.ifscCode &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.ifscCode}
                            </Box>
                        }
                    </Grid2>
                </Grid2>
            </Box>

            <Box 
            sx={{borderRadius:2, border:'5px solid lightgray', boxShadow:3, mb:4}}
            >
                <Typography
                variant='h6'
                textAlign={'center'}
                sx={{background:'lightgray', py:3}}
                >
                    Expense Details
                </Typography>

                <Grid2 container 
                columnSpacing={6} 
                rowSpacing={4}
                columns={12}
                px={7}
                py={5}
                >
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        name='expenseType'
                        placeholder='Enter expense Type'
                        value={formik.values.expenseType}
                        onChange={formik.handleChange}
                        label="Expense Type"
                        fullWidth    
                        />
                        {
                            formik.errors.expenseType &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.expenseType}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        label="Department"
                        name="department"
                        placeholder='Enter department'
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.department &&
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.department}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                        <InputLabel id="month">Month</InputLabel>
                        <Select
                        id='month'
                        label="Month"
                        name='month'
                        value={formik.values.month}
                        onChange={formik.handleChange}
                        >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                        {formik.errors.month && formik.touched.month &&
                        <Box sx={{color:'error.main'}}>{formik.errors.month}</Box>
                        }
                    </FormControl>
                    </Grid2>
                    <Grid2 item size={{xs:12, sm:6}}>
                        <TextField
                        name='amount'
                        label="Amount"    
                        placeholder='Enter amount'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        fullWidth
                        />
                        {
                            formik.errors.amount && 
                            formik.touched.amount &&
                            <Box sx={{color:'error.main'}}>
                                {formik.errors.amount}
                            </Box>
                        }
                    </Grid2>
                    <Grid2 item size={{xs:12}}>
                        <TextField
                        label="Details"
                        placeholder='Enter your Details'
                        multiline
                        rows={3}
                        fullWidth
                        />
                    </Grid2>
                    <Grid2 item size={{xs:12}}>
                        <Box
                        sx={{border:'2px solid #ccc', p:'20px', borderRadius:2, textAlign:'center'}}
                        >
                            <Typography variant="h6" sx={{ mb: 1 }}>
                            Upload Billing Document
                            </Typography>

                            <UploadFileIcon sx={{ fontSize: 40, color: '#aaa', mb: 1 }} />

                            <Typography variant="caption" display="block" color="textSecondary">
                            Supported formats: PDF, JPG, PNG. 
                            </Typography>

                            <Typography variant="caption" display="block" color="textSecondary" mb={2}>
                            File Size: 5MB.
                            </Typography>

                            <TextField
                            type="file"
                            inputProps={{ accept: ".pdf,.jpg, .png" }}
                            id="file-input"
                            sx={{maxWidth:'60%'}}
                            onChange={handleUploadFile}
                            />
                            {fileError && 
                            <Typography color='error'>
                                {fileError}    
                            </Typography>}
                            {formik.errors.userFile && formik.touched.userFile &&
                            <Box sx={{color:'error.main'}}>{formik.errors.userFile}</Box>
                            }
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>         
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{mx:'auto',display:'block', py:2, borderRadius:20, width:"200px"}}
                    >
                    Submit
                </Button>
            </Form>
            </Formik>
      </Box>
    )
}