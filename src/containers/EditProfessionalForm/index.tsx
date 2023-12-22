// MAIN MODULES
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { History } from 'history'
import { compose } from 'recompose'
import { Formik, Field } from 'formik'
import Grid from '@material-ui/core/Grid'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import FormLabel from '@material-ui/core/FormLabel'
import { CircularProgress, Select, MenuItem, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Compressor from 'compressorjs'
import Swal from 'sweetalert2'

// COMPONENTS
import Error from '../JoinProfessionalForm/Error'
import ValidationSchema from '../JoinProfessionalForm/validation'
import Avatar from '../../components/Avatar/Avatar'

// STYLES
import '../JoinProfessionalForm/styles.scss'

// TYPES
import { State } from '../../reducers'

// SERVISES
import { updateCompleteUserData, updateFiltersData, getFbData, updateUserData } from '../../servises/firebase'
import { addCurrentUser, getUserFromId, addDiagnoses, addCityList, addDisorderList } from '../../actions';
import { setItemToLocalStorage } from '../../servises/localStorage'
import { setLoginUser } from '../../routines/main';
const filter = createFilterOptions();

type ComponentProps = {
    history: History
    authenticationId?: any
    [key: string]: any
    userData?: any
    cityList: string[]
    disorderList: string[]
    diagnoses: any[]
}
interface UserData {
    first_name: string
    last_name: string
    email: string
    address: string
    phone: string
    bio: string
    site: string
    exp: string
    working_hours: string
    prof_statement: string
    treatment_approaches: string
    id: string
    authId: string
    pictures: string[]
    working_days: string[]
    work_place: string[]
    specialities: string[]
    education_background: string[]
    avatar: any
    prof_title: string
    country: string
    city: string
    postal_code: string
    terms_accepted: boolean
    picture1: string
    picture2: string
}
interface EditProfessionalFormState {
    moreSpecialities: boolean
    moreWorkplace: boolean
    moreEducation: boolean
    getUserData: UserData
    newUserId: string
    specialities: string[]
    diagnoses: any[]
    professions: any[]
    cities: any[]
    education_background: string[]
    work_place: string[]
    treatment_approaches: string[]
    loader: boolean
    currEdu: string[]
    currSpecialities: string[]
    currWorkPlaces: string[]
    currTreatment: string[]
    errorMessage: string
    error: string
    avatar: string
    showModal: boolean
    province: string
    disabled1: boolean
    disabled2: boolean
}
const bc: string = 'join-professional'
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const appointment = ['Office/Clinic', 'In School Visits', 'In Home', 'Online']
function Checkbox(props: any) {

    return (
        < Field name={props.name} >
            {({ field, form }: any) => (
                <label>
                    <input
                        type='checkbox'
                        {...props}
                        checked={field.value.includes(props.value)}

                        onChange={() => {
                            if (field.value.includes(props.value)) {
                                const nextValue = field.value.filter(
                                    (value: string) => value !== props.value
                                )
                                form.setFieldValue(props.name, nextValue)
                            } else {
                                const nextValue = field.value.concat(props.value)
                                form.setFieldValue(props.name, nextValue)
                            }
                        }}
                    />
                    {props.value}
                </label>
            )
            }
        </Field >
    )
}
class EditProfessionalForm extends Component<ComponentProps, EditProfessionalFormState> {
    state: EditProfessionalFormState = {
        moreSpecialities: false,
        moreWorkplace: false,
        moreEducation: false,
        newUserId: '',
        getUserData: ({} as any),
        specialities: [],
        work_place: [],
        education_background: [],
        treatment_approaches: [],
        loader: false,
        currEdu: [],
        currSpecialities: [],
        currWorkPlaces: [],
        currTreatment: [],
        errorMessage: '',
        error: '',
        avatar: '',
        showModal: false,
        province: 'Ontario',
        disabled1: false,
        disabled2: false,
        diagnoses: [],
        professions: [],
        cities: []
    }
    componentDidMount = () => {
        this.handleDiagSorting()
        this.setState({
            currEdu: this.props.userData.education_background,
            currSpecialities: this.props.userData.specialities,
            currWorkPlaces: this.props.userData.work_place,
            currTreatment: typeof this.props.userData.treatment_approaches !== "string"
                ? this.props.userData.treatment_approaches
                : [this.props.userData.treatment_approaches]
        })
    }
    handleDiagSorting = () => {
        const sortedDiagnoses = this.props.diagnoses && this.props.diagnoses.sort(function (a: any, b: any) {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        const sortedProfessions = this.props.disorderList && this.props.disorderList.sort(function (a: any, b: any) {
            const textA = a.type.toUpperCase();
            const textB = b.type.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        const sortedCities = this.props.cityList && this.props.cityList.sort(function (a: any, b: any) {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.setState({
            diagnoses: sortedDiagnoses,
            professions: sortedProfessions,
            cities: sortedCities
        })
    }
    sortDays = (weekDays: string[], list: string[]) => {
        const dayOfWeek = 6;
        const sortedList = list.slice(dayOfWeek).concat(list.slice(0, dayOfWeek));
        return weekDays.sort((a, b) => {
            if (sortedList.indexOf(a) > sortedList.indexOf(b)) return 1;
            if (sortedList.indexOf(a) < sortedList.indexOf(b)) return -1;
            return 0;
        });
    };
    public submitUserData = async (ref: string, value: any, resetForm: any, event: any, errors: any, isSubmitting: any) => {
        event.preventDefault()
        this.setState({ loader: true })
        const pix = [value.picture1, value.picture2];
        value.working_days = this.sortDays([...value.working_days], daysOfWeek)
        value.work_place = this.sortDays([...value.work_place], appointment)
        value.pictures = [...pix]
        const newCity = this.state.cities.filter(item => item.name === value.city);
        const newProfession = this.state.professions.filter(item => item.type === value.prof_title);
        const newSpecialities = value.specialities.filter((item: any) => {
            return !this.state.diagnoses.some((item2: any) => item == item2.name)
        });
        if (!newCity.length && value.city !== "") {
            await updateFiltersData("cities", { name: value.city }).then(async (res) => {
                await updateUserData("cities", res.id);
                await getFbData('cities')
                    .then((querySnapshot) => {
                        const cities: any = []
                        querySnapshot.forEach((doc: any) => {
                            cities.push(doc.data())
                        })
                        this.props.addCity(cities)
                        setItemToLocalStorage('cities', cities)
                    }).catch((e) => {
                        // Error stored in  state
                        this.setState({ error: e })
                    })
            });
        }
        if (!newProfession.length && value.prof_title !== "") {
            updateFiltersData("specialities", { type: value.prof_title }).then(async (res) => {
                await updateUserData("specialities", res.id);
                await getFbData('specialities')
                    .then((querySnapshot) => {
                        const profs: any = []
                        querySnapshot.forEach((doc: any) => {
                            profs.push(doc.data())
                        })
                        this.props.addProfession(profs)
                        setItemToLocalStorage('specialities', profs)
                    }).catch((e) => {
                        // Error stored in  state
                        this.setState({ error: e })
                    })
            });
        }
        if (newSpecialities.length) {
            {
                await newSpecialities && newSpecialities.map(async (item: any) => {

                    await updateFiltersData("diagnoses", { name: item }).then(async (res) => {
                        await updateUserData("diagnoses", res.id);

                    })
                });
                await getFbData('diagnoses')
                    .then((querySnapshot) => {
                        const spec: any = []
                        querySnapshot.forEach((doc: any) => {
                            spec.push(doc.data())
                        })
                        this.props.addSpecialities(spec)
                        setItemToLocalStorage('diagnoses', spec)
                    }).catch((e) => {
                        // Error stored in  state
                        this.setState({ error: e })
                    })
            }
        }

        if (this.props.userData.id) {
            value.id = this.props.userData.id
            const { picture1, picture2, ...rest } = value
            await updateCompleteUserData(ref, this.props.userData.id, rest)
                .then(async response => {
                    await this.props.addUser(rest)
                    await this.props.getUser(value.id)
                    this.setState({ loader: false })
                }).catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Profile is not saved, please contact administrator.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        this.setState({ loader: false })
                    })
                })
        }
    }
    addSpecField = (): any => {
        this.setState({ specialities: [...this.state.specialities, ''] }
        )
    }
    addWorkField = (): any => {
        this.setState({ work_place: [...this.state.work_place, ''] }
        )
    }
    addEduField = (): any => {
        this.setState({ education_background: [...this.state.education_background, ''] }
        )
    }
    addTreatmentField = (): any => {
        this.setState({ treatment_approaches: [...this.state.treatment_approaches, ''] }
        )
    }
    ImageHandler = (event: any, target: any, index: number): any => {
        const maxDimention = 500;
        let quality = 1
        if (event.target.files[0].size > 15016800) {
            quality = 0.005
        } else if (event.target.files[0].size > 13016800) {
            quality = 0.1
        } else if (event.target.files[0].size > 5016800 && event.target.files[0].size < 13016800) {
            quality = 0.2
        } else if (event.target.files[0].size > 1016800 && event.target.files[0].size < 5016800) {
            quality = 0.3
        } else {
            quality = 0.4
        }
        if (event.target.files[0]) {
            const file = event.target.files[0]
            // tslint:disable-next-line: no-unused-expression
            new Compressor(file, {
                quality,
                success(result) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const reader = new FileReader()
                    reader.onload = (fileLoadedEvent: any) => {
                        const img = new Image();
                        img.onload = () => {
                            const largerDimention = Math.max(img.width, img.height);
                            let factor = 1;
                            if (largerDimention > maxDimention) {
                                factor = largerDimention / maxDimention;
                            }
                            const width = img.width / factor;
                            const height = img.height / factor;
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                            const src = canvas.toDataURL('image/jpeg', 0.7);
                            if (index === 1) {
                                target.picture1 = src;
                                target.pictures[0] = src;
                            } else if (index === 2) {
                                target.picture2 = src;
                                target.pictures[1] = src;
                            }
                        }
                        img.src = fileLoadedEvent.target.result;
                    }
                    reader.readAsDataURL(result)
                },
                error(err) {
                    console.log(err.message);
                }
            })
        }
    }
    firstImageSelectedHandler = async (event: any, values: any): Promise<any> => {

        if (event.target.files[0]) {
            if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
                await this.ImageHandler(event, values, 1)
                // this.setState({ disabled1: false })
            } else {
                event.target.value = ''
                Swal.fire({
                    title: 'Not an image',
                    text: 'Select JPG, PNG or JPEG image',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } else {
            values.picture1 = '';
            values.pictures[0] = '';
            // this.setState({ disabled1: true })
        }
    }
    secondImageSelectedHandler = async (event: any, values: any): Promise<any> => {
        if (event.target.files[0]) {
            if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
                await this.ImageHandler(event, values, 2)
                // this.setState({ disabled2: false })
            } else {
                event.target.value = ''
                Swal.fire({
                    title: 'Not an image',
                    text: 'Select JPG, PNG or JPEG image',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } else {
            values.picture2 = '';
            values.pictures[1] = '';
            // this.setState({ disabled2: true })
        }
    }
    closeModal = () => {
        this.setState({ loader: false, showModal: false })
    }
    openModal = () => {
        this.setState({ showModal: true })
    }

    handleSpecialities = (data: any, values: any) => {
        if (data !== null && data !== "") {
            values.specialities = data;

        } else {
            values.specialities = [];
        }
    }
    handleProfession = (data: any, values: any) => {
        if (data !== null && data !== "") {
            values.prof_title = data
        } else {
            values.prof_title = "";
        }
    }
    handleCity = (data: any, values: any) => {
        if (data !== null && data !== "") {
            values.city = data;
        } else {
            values.city = "";
        }
    }
    render() {
        return (
            <div className={`${bc} ${bc}__middle-container`}>
                {this.state.loader === true ? <div className={`${bc}__loader`}> <CircularProgress /></div> :
                    (
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                first_name: this.props.userData && this.props.userData.first_name,
                                last_name: this.props.userData && this.props.userData.last_name,
                                email: this.props.userData && this.props.userData.email,
                                exp: this.props.userData && this.props.userData.exp,
                                avatar: this.props.userData && this.props.userData.avatar,
                                working_hours: this.props.userData && this.props.userData.working_hours,
                                address: this.props.userData && this.props.userData.address,
                                site: this.props.userData && this.props.userData.site,
                                bio: this.props.userData && this.props.userData.bio,
                                prof_statement: this.props.userData && this.props.userData.prof_statement,
                                specialities: this.props.userData && this.props.userData.specialities,
                                education_background: this.props.userData && this.props.userData.education_background,
                                work_place: this.props.userData && this.props.userData.work_place,
                                phone: this.props.userData && this.props.userData.phone,
                                working_days: this.props.userData && this.props.userData.working_days,
                                pictures: this.props.userData && this.props.userData.pictures,
                                city: this.props.userData && this.props.userData.city,
                                country: this.props.userData && this.props.userData.country,
                                treatment_approaches: this.props.userData && this.props.userData.treatment_approaches,
                                id: this.props.userData && this.props.userData.id,
                                authId: this.props.userData && this.props.userData.authId,
                                prof_title: this.props.userData && this.props.userData.prof_title,
                                postal_code: this.props.userData && this.props.userData.postal_code,
                                terms_accepted: true,
                                picture1: this.props.userData && this.props.userData.pictures[0],
                                picture2: this.props.userData && this.props.userData.pictures[1],
                                dr_needed: this.props.userData && this.props.userData.dr_needed
                            }}

                            validationSchema={ValidationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true)
                            }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                                resetForm,
                                isValid
                            }) => (
                                    <form onSubmit={handleSubmit}>
                                        <h3>Edit Personal Information</h3>

                                        <div className='input-row'>
                                            {/* <Avatar preview={values.avatar} setFieldValue={setFieldValue} edit={true} /> */}
                                            {/* <Error touched={touched.avatar} message={errors.avatar} /> */}
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                placeholder='First Name'
                                                name='first_name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.first_name ? values.first_name : ''}
                                                className={touched.first_name && errors.first_name ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.first_name} message={errors.first_name} />
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                placeholder='Last Name'
                                                name='last_name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.last_name ? values.last_name : ''}
                                                className={touched.last_name && errors.last_name ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.last_name} message={errors.last_name} />
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                placeholder='Personal email'
                                                name='email'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email ? values.email : ''}
                                                className={touched.email && errors.email ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.email} message={errors.email} />
                                        </div>
                                        <div className='input-row'>
                                            <Field
                                                placeholder='Street name'
                                                name='address'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address ? values.address : ''}
                                                className={touched.address && errors.address ? `${bc}__middle-container__has__error`
                                                    : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.address} message={errors.address} />
                                        </div>
                                        <div className='input-row'>
                                            <Field
                                                placeholder='Phone Number'
                                                name='phone'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phone ? values.phone : ''}
                                                className={touched.phone && errors.phone ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.phone} message={errors.phone} />
                                        </div>

                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <div className='input-row'>
                                                    <Select
                                                        name='country'
                                                        labelId="demo-simple-select-readonly-label"
                                                        id="demo-simple-select-readonly"
                                                        value={values.country ? values.country : ''}
                                                        onChange={handleChange}
                                                        className={touched.country && errors.country
                                                            ? `${bc}__middle-container__has__error`
                                                            : `${bc}__middle-container__input`}
                                                    >
                                                        <MenuItem value="Canada">
                                                            Canada
                                                </MenuItem>
                                                    </Select>
                                                    <Error touched={touched.country} message={errors.country} />
                                                </div>
                                            </Grid>
                                            <Grid item={true}>
                                                <div className='input-row'>
                                                    <Select
                                                        name='province'
                                                        labelId="demo-simple-select-readonly-label"
                                                        id="demo-simple-select-readonly"
                                                        value={this.state.province ? this.state.province : ''}
                                                        onChange={handleChange}
                                                        className={touched.country && errors.country
                                                            ? `${bc}__middle-container__has__error`
                                                            : `${bc}__middle-container__input`}
                                                    >
                                                        <MenuItem value="Ontario">
                                                            Ontario
                                                </MenuItem>
                                                    </Select>
                                                    <Error touched={touched.country} message={errors.country} />
                                                </div>
                                            </Grid>

                                            <Grid item={true}>
                                                <div className='input-row'>
                                                    <Autocomplete
                                                        id="tags-filled"
                                                        style={{ height: "100%", width: "140px" }}
                                                        options={this.state.cities.map((option) => option.name)}
                                                        freeSolo
                                                        filterOptions={(options: any, params: any) => {
                                                            const filtered = filter(options, params);

                                                            if (params.inputValue !== '') {
                                                                filtered.push(
                                                                    params.inputValue
                                                                );
                                                                values.city = params.inputValue;
                                                            }

                                                            return filtered;

                                                        }}

                                                        defaultValue={values.city ? values.city : []}
                                                        onChange={(e: any, data: any) => this.handleCity(data, values)}
                                                        onBlur={handleBlur}
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                            ))
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField style={{ height: "100%" }} value={values.city ? values.city : []}
                                                                onBlur={handleBlur} className={touched.city && errors.city ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`} name='city' {...params} variant="outlined" placeholder="Select City" />
                                                        )}
                                                    />


                                                    <Error touched={touched.city} message={errors.city} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <div className='input-row'>
                                            <Field
                                                placeholder='Postal code'
                                                name='postal_code'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.postal_code ? values.postal_code : ''}
                                                className={touched.postal_code && errors.postal_code ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.postal_code} message={errors.postal_code} />
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                component='textarea'
                                                placeholder='Message to Caregivers - no more than 500 words '
                                                name='bio'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.bio ? values.bio : ''}
                                                className={touched.bio && errors.bio ? `${bc}__middle-container__has__error` : `${bc}__middle-container__multi_input`}
                                            />
                                            <Error touched={touched.bio} message={errors.bio} />
                                        </div>

                                        <h3>Educational Information</h3>

                                        <Grid container>
                                            <Grid item md={8}>

                                                {this.state.currEdu.map((edu: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='margin-top' />
                                                            <Field
                                                                placeholder='Click + button to add multiple'
                                                                name={`education_background[${index}]`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.education_background[index]
                                                                    ? values.education_background[index]
                                                                    : ''}
                                                                className={`${bc}__middle-container__input`}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                                <Error touched={touched.education_background} message={errors.education_background} />
                                                {this.state.education_background.map((edu, index) => {
                                                    return (
                                                        <div key={index + this.state.currEdu.length}>
                                                            <Field
                                                                placeholder='Click + button to add multiple'
                                                                name={`education_background[${index + this.state.currEdu.length}]`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.education_background[index + this.state.currEdu.length]
                                                                    ? values.education_background[index + this.state.currEdu.length]
                                                                    : ''}
                                                                className={`${bc}__middle-container__input`}
                                                            />
                                                            <div className='margin-bottom' />
                                                        </div>
                                                    )

                                                })}
                                                <button
                                                    className='add-button'
                                                    type='button'
                                                    onClick={() => this.addEduField()
                                                    }
                                                >
                                                    <AddCircleOutlineIcon />
                                                </button>
                                                <div className='margin-top' />
                                            </Grid>
                                        </Grid>

                                        <h3>Professional Information</h3>

                                        <div className='input-row'>

                                            <FormLabel >Professional Title</FormLabel>
                                            <div className='margin-bottom' />
                                            <Autocomplete
                                                id="tags-filled"
                                                style={{ height: "100%" }}
                                                options={this.state.professions.map((option) => option.type)}
                                                freeSolo
                                                filterOptions={(options: any, params: any) => {
                                                    const filtered = filter(options, params);
                                                    if (params.inputValue !== '') {
                                                        filtered.push(
                                                            params.inputValue
                                                        );
                                                        values.prof_title = params.inputValue;
                                                    }
                                                    return filtered;
                                                }}
                                                defaultValue={values.prof_title ? values.prof_title : ''}
                                                onChange={(e: any, data: any) => this.handleProfession(data, values)}
                                                onBlur={handleBlur}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField style={{ height: "100%" }} value={values.prof_title ? values.prof_title : ''}
                                                        onBlur={handleBlur} className={touched.prof_title && errors.prof_title ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`} name='prof_title' {...params} variant="outlined" placeholder=" Occupational Therapist, Pediatrician, Psychotherapist" />
                                                )}
                                            />
                                            <Error touched={touched.prof_title} message={errors.prof_title} />
                                        </div>

                                        <div className='input-row'>
                                            <div className='input-row'>
                                                <Field
                                                    placeholder='Website'
                                                    name='site'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.site ? values.site : ''}
                                                    className={touched.site && errors.site ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                                />
                                                <Error touched={touched.site} message={errors.site} />
                                            </div>
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                placeholder='Experience in years'
                                                name='exp'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.exp ? values.exp : ''}
                                                className={touched.exp && errors.exp ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.exp} message={errors.exp} />
                                        </div>

                                        <div className='input-row'>
                                            <Field
                                                placeholder='Working Hours i.e. 07:00 - 11:00'
                                                name='working_hours'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.working_hours ? values.working_hours : ''}
                                                className={touched.working_hours && errors.working_hours ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.working_hours} message={errors.working_hours} />
                                        </div>

                                        <div className='input-row'>
                                            <div className='input-row'>
                                                <Field
                                                    component='textarea'
                                                    placeholder='Professional Statement - no more than 500 words'
                                                    name='prof_statement'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.prof_statement ? values.prof_statement : ''}
                                                    className={touched.prof_statement && errors.prof_statement ? `${bc}__middle-container__has__error` : `${bc}__middle-container__multi_input`}
                                                />
                                                <Error touched={touched.prof_statement} message={errors.prof_statement} />
                                            </div>
                                        </div>
                                        <Grid container>
                                            <Grid item md={8}>
                                                <FormLabel >Specialities i.e. ADHD, Family Mediation, Cerebral Palsy</FormLabel>
                                                <div className='margin-bottom' />
                                                <Autocomplete
                                                    multiple
                                                    className={touched.specialities && errors.specialities ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                                    id="tags-filled"
                                                    style={{ height: "auto", padding: '0' }}
                                                    options={this.state.diagnoses.map((option) => option.name)}
                                                    freeSolo

                                                    onChange={(e, data) => this.handleSpecialities(data, values)}
                                                    onBlur={handleBlur}
                                                    defaultValue={values.specialities ? values.specialities : []}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            style={{ height: "auto", border: 'none' }}
                                                            value={values.specialities ? values.specialities : []}
                                                            onBlur={handleBlur}
                                                            className={touched.specialities && errors.specialities ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`} name='specialities' {...params} variant="outlined" placeholder="ADHD, Family Mediation, Cerebral Palsy" />
                                                    )}
                                                />
                                                <Error touched={touched.specialities} message={errors.specialities} />
                                                {/* <div className='margin-top' /> */}
                                            </Grid>
                                        </Grid>

                                        <div className='input-row'>
                                            <FormLabel >Appointments Available</FormLabel>
                                            <div className='margin-top' />
                                            <Checkbox name='work_place' value='Office/Clinic' />
                                            <Checkbox name='work_place' value='In School Visits' />
                                            <Checkbox name='work_place' value='In Home' />
                                            <Checkbox name='work_place' value='Online' />
                                            <Error touched={touched.work_place} message={errors.work_place} />
                                        </div>
                                        <Grid container={true}>
                                            <Grid item={true} md={8}>
                                                <FormLabel >Treatment Approaches (Optional)</FormLabel>
                                                <div className='margin-bottom' />
                                                {this.state.currTreatment.map((edu: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='margin-top' />
                                                            <Field
                                                                placeholder='Click + button to add multiple'
                                                                name={`treatment_approaches[${index}]`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.treatment_approaches[index]
                                                                    ? values.treatment_approaches[index]
                                                                    : ''}
                                                                className={`${bc}__middle-container__input`}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                                <Error touched={touched.treatment_approaches} message={errors.treatment_approaches} />
                                                {this.state.treatment_approaches.map((edu, index) =>
                                                    (
                                                        <div key={index + 1}>
                                                            <Field
                                                                placeholder='Click + button to add multiple'
                                                                name={`treatment_approaches[${index + this.state.currTreatment.length}]`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.treatment_approaches[index + this.state.currTreatment.length]
                                                                    ? values.treatment_approaches[index + this.state.currTreatment.length]
                                                                    : ''}
                                                                className={`${bc}__middle-container__input`}
                                                            />
                                                            <div className='margin-bottom' />
                                                        </div>
                                                    ))}
                                                <button
                                                    className='add-button'
                                                    type='button'
                                                    onClick={() => this.addTreatmentField()
                                                    }
                                                >
                                                    <AddCircleOutlineIcon />
                                                </button>
                                                <div className='margin-top' />
                                            </Grid>
                                        </Grid>

                                        <div className='input-row'>
                                            <FormLabel >Office Pictures - Select 2 pictures</FormLabel>
                                            <div className='margin-top' />
                                            <input
                                                placeholder='Office Pictures'
                                                type='file'
                                                accept='image/x-png,image/jpeg'
                                                name='picture1'
                                                onChange={e => this.firstImageSelectedHandler(e, values)}
                                                onBlur={handleBlur}
                                                className={touched.picture1 && errors.picture1 ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.picture1} message={errors.picture1} />
                                            <input
                                                placeholder='Office Pictures'
                                                type='file'
                                                accept='image/x-png,image/jpeg'
                                                name='picture2'
                                                onChange={e => this.secondImageSelectedHandler(e, values)}
                                                onBlur={handleBlur}
                                                className={touched.picture2 && errors.picture2 ? `${bc}__middle-container__has__error` : `${bc}__middle-container__input`}
                                            />
                                            <Error touched={touched.picture2} message={errors.picture2} />
                                        </div>

                                        <div className='input-row'>
                                            <FormLabel >Working Days</FormLabel>
                                            <div className='margin-top' />
                                            <Checkbox name='working_days' value='Sunday' />
                                            <Checkbox name='working_days' value='Monday' />
                                            <Checkbox name='working_days' value='Tuesday' />
                                            <Checkbox name='working_days' value='Wednesday' />
                                            <Checkbox name='working_days' value='Thursday' />
                                            <Checkbox name='working_days' value='Friday' />
                                            <Checkbox name='working_days' value='Saturday' />
                                            <Error touched={touched.working_days} message={errors.working_days} />
                                        </div>
                                        <div className='input-row'>
                                            <div className='terms-and-conditions'>
                                                <input
                                                    type="checkbox"
                                                    name="dr_needed"
                                                    value={values.dr_needed}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    checked={values.dr_needed}
                                                />

                                                       Doctor Referral Needed?
                                            </div>
                                        </div>

                                        <div className='input-row'>
                                            <button
                                                className='submit-button'
                                                type='button'
                                                disabled={!isValid || this.state.disabled1 || this.state.disabled2}
                                                onClick={(e) => {
                                                    this.submitUserData('/users', values, resetForm, e, errors, isSubmitting)
                                                }}
                                            >
                                                Submit </button>
                                        </div>
                                    </form>
                                )}
                        </Formik>
                    )
                }
            </div >
        )
    }
}
const mapStateToProps = (state: State) => ({ 
    ...state.app.user,
    ...state.app.cityList,
    ...state.app.disorderList,
    ...state.app.diagnoses,
    ...state.app })
const mapDispatchToProps = (dispatch: any) => {
    return {
        getUser: (id: string) => dispatch(getUserFromId(id)),
        addCurrUser: (id: string) => dispatch(addCurrentUser(id)),
        // addCurrUser: (user: any) => dispatch(addCurrentUser(user)),
        addUser: (user: any) => dispatch(setLoginUser(user)),
        addCity: (cityList: any) => dispatch(addCityList(cityList)),
        addProfession: (profList: any) => dispatch(addDisorderList(profList)),
        addSpecialities: (specialitiesList: any) => dispatch(addDiagnoses(specialitiesList)),
    }
}
export default compose<ComponentProps, any>(withRouter, connect(mapStateToProps, mapDispatchToProps))(EditProfessionalForm)
