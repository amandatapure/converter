import { Button, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const toast = useToast();
  const handleChange = async (e) => {
    // alert('process start')
    const file = e.target.files[0];
    if (!file) {
      toast({
        title: `Please select file`,
        status: 'error',
        isClosable: true,
      })
    }
    setWordFile(file);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log('aman',wordFile);
    formData.append('file', wordFile);
    formData.append('fileName', wordFile.name);
    fetch('http://localhost:5000/docxtopdf', {
      method: 'POST',
      body: formData,
      // 👇 Set headers manually for single wordFile upload
      headers: {
        'Content-Type': wordFile.type,
        'Content-Length': `${wordFile.size}`, // 👈 Headers need to be a string
      },
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>console.log(err.message))
  }

  return (
    <VStack gap={'3rem'} p={'2rem 0rem'} minH={'100vh'} align={'center'} bgColor={'#f3f0ec'}>
      <VStack>
        <Heading>Pdf to word converter</Heading>
        <Text fontSize={'1.7rem'}>Convert your PDF to WORD documents with incredible accuracy.</Text>
      </VStack>
      <form   onSubmit={handleSubmit}>
      <input onChange={handleChange} accept=".docx" style={{ display: 'none' }} id="files" type={'file'} />
      <label htmlFor="files">
        <Text _hover={{
          bgColor: '#0e1823'
        }} fontSize={'1.7rem'} rounded={'0.2rem'} fontFamily={'math'} p={'0.6rem 2rem'} cursor={'pointer'} color={'white'} bgColor={'#e5322d'}>
          Select word file
        </Text>
      </label>
      {
        wordFile&&
      <VStack>
          <Button type='submit' bgColor={'white'} color={'black'} _hover={{
            background:'#0e1823',
            color:'white'  
          }} >
              Download pdf file
          </Button>
        </VStack>
      }
          </form>
    </VStack>
  )
}

export default Home