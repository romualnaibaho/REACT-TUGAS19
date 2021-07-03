import React, { Component } from "react";
import api from "../api/karyawan";

import { Container, Table, Button, Form } from "react-bootstrap";

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      karyawan: [],
      edit: false,
      dataPost: {
          id : 0,
          nama_karyawan: "",
          jabatan: "",
          jenis_kelamin: "",
          tanggal_lahir: ""
      }
    };

    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  reloadData(){
      api.get("/data-karyawan").then(res => {
      this.setState({
          karyawan: res.data,
          edit: false
        });
    });
  }

  componentDidMount(){
      this.reloadData();
  }

  inputChange(e){
      let newDataPost = {...this.state.dataPost};
      if(this.state.edit === false){
        newDataPost['id'] = new Date().getTime();
      }
      newDataPost[e.target.name] = e.target.value;

      this.setState(
          {
              dataPost: newDataPost
          }
      );
  }

  clearData = () =>{
        let newDataPost = {...this.state.dataPost};
        newDataPost['id'] = "";
        newDataPost['nama_karyawan'] = "";
        newDataPost['jabatan'] = "";
        newDataPost['jenis_kelamin'] = "";

        this.setState({
            dataPost: newDataPost
        });
    }

  onSubmitForm(){

      if(this.state.edit === false){
        api.post('/data-karyawan', this.state.dataPost)
        .then(()=> {
            this.reloadData();
            this.clearData();
        });
      } else{
          api.put(`/data-karyawan/${this.state.dataPost.id}`, this.state.dataPost)
          .then(()=>{
              this.reloadData();
              this.clearData();
          })
      }
  }

  handleRemove(e){
      fetch(`http://localhost:3006/data-karyawan/${e.target.value}`, {
          method: "DELETE"
        }).then(res => {this.reloadData();console.log(res.data);});
  }

  getDataId = (e) =>{
      api.get(`/data-karyawan/${e.target.value}`).then(res => {
          this.setState({
              dataPost: res.data,
              edit: true
          });
      });
  }

    render(){
        return (
            <div>
                <Container>
                    <Form className="mt-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control type="text" name="nama_karyawan" value={this.state.dataPost.nama_karyawan} placeholder="Masukkan Nama Lengkap" onChange={this.inputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control type="text" name="jabatan" value={this.state.dataPost.jabatan} placeholder="Masukkan Jabatan" onChange={this.inputChange} />
                        </Form.Group>

                         <Form.Group className="mb-3">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control type="text" name="jenis_kelamin" value={this.state.dataPost.jenis_kelamin} placeholder="Masukkan Jenis Kelamin" onChange={this.inputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control type="date" name="tanggal_lahir" value={this.state.dataPost.tanggal_lahir} placeholder="Pilih Tanggal Lahir" onChange={this.inputChange} />
                        </Form.Group>
                    
                        <Button variant="primary" type="submit" onClick={this.onSubmitForm}>
                            Simpan
                        </Button>
                    </Form>
                    
                    <Table className="mt-5" striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>No.</th>
                                <th>Nama Lengkap</th>
                                <th>Jabatan</th>
                                <th>Jenis Kelamin</th>
                                <th>Tanggal Lahir</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.karyawan.map((data, index) => {
                                return(
                                <tr key={index}>
                                    <td className="text-center">{index+1}</td>
                                    <td>{data.nama_karyawan}</td>
                                    <td>{data.jabatan}</td>
                                    <td className="text-center">{data.jenis_kelamin}</td>
                                    <td className="text-center">{data.tanggal_lahir}</td>
                                    <td className="text-center">
                                        <Button value={data.id} onClick={this.getDataId} variant="warning" style={{width: "90px"}}>Edit</Button> | <Button value={data.id} onClick={this.handleRemove} variant="danger" style={{width: "90px"}}>Hapus</Button>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </Table>
              </Container>
            </div>
        );
    }
}

export default Main;
