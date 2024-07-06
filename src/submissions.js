import supabase from './supabaseClient';

export const getRemoteSubmissions = async (userID) => {
  let { data: submissions, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', userID);
  return submissions;
}

export const pushRemoteSubmission = async (userID, submission) => {
  console.log("saving to supabase")
  let { data, error } = await supabase
    .from('submissions')
    .insert([
      {
        user_id: userID,
        problem_name: submission.problem_name,
        problem_difficulty: submission.difficulty,
        successful: submission.successful,
      }
    ]);
}