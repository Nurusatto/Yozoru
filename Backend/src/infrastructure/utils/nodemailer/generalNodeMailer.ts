import nodemailer, { Transporter } from 'nodemailer'

export const transporter = (service: string, user: string, pass: string) => {
	return nodemailer.createTransport({
		service: service,
		auth: {
			user: user,
			pass: pass
		}
	});
};

export const sendEmail = async (email: string, title: string, description: string, transporter: Transporter) => {
	try{
		await transporter.sendMail({
			from: `GamePosing`,
			to: email,
			subject: title,
			text: description
		});
		console.log('Письмо успешно отправлено');
	}catch(err){
		console.error('Ошибка во время отправлений кода: ', err)
	};
};