import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Card, CardContent, Grid, IconButton, Toolbar, Typography, Box, Checkbox, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

// LinearProgressWithLabel component
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}  </Typography>    
      </Box>
    </Box>
  );
}

export const TestPage = () => {
  const questions = [
    'You regularly make new friends.',
    'Complex and novel ideas excite you more than simple and straightforward ones.',
    'You usually feel more persuaded by what resonates emotionally with you than by factual arguments.',
    'Your living and working spaces are clean and organized.',
    'You usually stay calm, even under a lot of pressure.',
    'You find the idea of networking or promoting yourself to strangers very daunting.',
    'You prioritize and plan tasks effectively, often completing them well before the deadline.',
    'People’s stories and emotions speak louder to you than numbers or data.',
    'You like to use organizing tools like schedules and lists.',
    'Even a small mistake can cause you to doubt your overall abilities and knowledge.'
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);    //Initialize currentQuestion to 0
  const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false));    // This creates an array with the same length as the questions array, where each element is initialized to false. This means that initially, no questions are marked as answered.
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));    //Initialize selectedOptions to an array of null values
  const [progress, setProgress] = useState(0);      //Initialize progress to 0
  
  const handleNextQuestion = () => {        //handleNextQuestion: This function is called when the user wants to move to the next question.
    if (answeredQuestions[currentQuestion]) {       //if (answeredQuestions[currentQuestion]): It first checks if the current question has been answered.
      setCurrentQuestion(currentQuestion + 1);    // If the current question has been answered, it updates currentQuestion to the next question.
      setProgress(((currentQuestion + 1) / questions.length) * 100);     //?? updates the progress percentage based on how many questions have been completed. 
      // This calculates the fraction of the quiz that has been completed. For example, if there are 10 questions in total and currentQuestion is 2 (meaning the user is on the 3rd question), the fraction completed would be 3/10.
      //((currentQuestion + 1) / questions.length) * 100: This converts the fraction into a percentage. Continuing the example above, 3/10 would become 30%.
  };
  }

  const handleAnswerQuestion = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answeredQuestions];
    const updatedSelectedOptions = [...selectedOptions];
  
    if (selectedOptions[questionIndex] === optionIndex) {       //If the clicked option is already selected, the following updates are made:
      // Unselect the option if it's already selected
      updatedAnswers[questionIndex] = false;   //A copy of the answeredQuestions state array. This array keeps track of whether each question has been answered (true or false).
      updatedSelectedOptions[questionIndex] = null; //A copy of the selectedOptions state array. This array stores the selected option index for each question (null if no option is selected)
    } else {  //If the clicked option is not already selected, the following updates are made
      // Select the new option
      updatedAnswers[questionIndex] = true;
      updatedSelectedOptions[questionIndex] = optionIndex;
    }
  
    setAnsweredQuestions(updatedAnswers);
    setSelectedOptions(updatedSelectedOptions);
  };
  

  return (
    <div>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <IconButton size="large" edge="end" color="inherit" aria-label="account" sx={{ marginRight: '12px' }}>
            <AccountCircle />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'grey', marginLeft: '-12px', fontStyle: 'italic', fontWeight: 'bold' }}
          >
            Personality Test
          </Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ marginLeft: 'auto' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Card sx={{ maxWidth: 1600, background: 'seagreen', marginBottom: '50px' }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '3rem',
              fontStyle: 'italic',
              marginTop: '50px',
            }}
          >
            Free Personality Test
          </Typography>
          <Typography sx={{ color: 'white' }}>NERIS Type Explorer®</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <Card sx={{ maxWidth: 200, background: 'lightblue' }}>
              <CardContent>
                <Typography variant="h5">Complete the Test</Typography>
                <Typography>Be yourself and answer honestly to find out your personality type.</Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 200, background: 'lightyellow' }}>
              <CardContent>
                <Typography variant="h5">View Detailed Results</Typography>
                <Typography>Learn how your personality type influences many areas of your life.</Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 200, background: 'lavender' }}>
              <CardContent>
                <Typography variant="h5">Unlock Your Potential</Typography>
                <Typography>Grow into the person you want to be with your optional Premium Suite.</Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ width: '90%', margin: 9 }}>
        <LinearProgressWithLabel value={progress} />
      </Box>

      {questions.map((question, questionIndex) => (     //questions.map(...) is a JavaScript function that iterates over each question in the questions array.question is the current question in the iteration.questionIndex is the index of the current question in the array.
        <Grid key={questionIndex} sx={{ margin: 5 }}>   {/* key={questionIndex} ensures each Grid element has a unique key, which helps React efficiently update and render elements. */}
          <Typography
            variant="h4"
            sx={{ margin: 5, color: 'grey' }}
            style={{ display: currentQuestion === questionIndex ? 'block' : 'none' }}
          >
            {question}
            <Box sx={{ display: 'flex', gap: 1, marginTop: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4" color="green">Agree</Typography>
              {[0, 1, 2, 3, 4, 5, 6].map((optionIndex) => (     //[0, 1, 2, 3, 4, 5, 6].map(...) iterates over option indices from 0 to 6. Each iteration renders a Checkbox component.
                <Checkbox
                  key={optionIndex}    //key={optionIndex} ensures each Checkbox has a unique key.
                  color={optionIndex < 3 ? 'success' : optionIndex === 3 ? 'default' : 'secondary'}   //sets the color of the checkbox based on its index: green for indices less than 3, default for index 3, and secondary color for indices greater than 3.
                  checked={selectedOptions[questionIndex] === optionIndex  }     // sets the checkbox state to checked if the selected option matches the current option index.
                  onChange={() => handleAnswerQuestion(questionIndex, optionIndex)}    //calls the handleAnswerQuestion function with the current question and option index when the checkbox is changed.
                />
              ))}
              <Typography variant="h4" color="secondary">Disagree</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}    //onClick={handleNextQuestion} sets the function to be called when the button is clicked, which is handleNextQuestion.
              disabled={!answeredQuestions[questionIndex]}    // disables the button if the current question has not been answered, preventing the user from moving to the next question without answering.
            >
              Next
            </Button>
          </Typography>
        </Grid>
      ))}
    </div>
  );
};
